import * as React from 'react';
import { SelectChangeEvent } from '@mui/material';

import * as monaco from 'monaco-editor';
import '../../disabledActions';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useIpc } from '../../hooks/useFromDi';
import { redisActions } from '../../store/reducers/redis-slice';

import useConfirmModal from '../../hooks/useConfirmModal';
import useRenameKeyModal from '../../hooks/useRenameKey';
import useExpireKeyModal from '../../hooks/useExpireKey';

import { Header } from '../header';
import { ValueContainer } from './valueDetail.styles';
import EditorToolbar from '../editorToolbar/EditorToolbar';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface SelectorState {
  value: string;
  key: string;
  hasConnection: boolean;
}

const ValueDetail = (props: Props): JSX.Element => {
  const changeTracker = React.useRef<monaco.IDisposable>();
  const { Confirm, handleShow } = useConfirmModal();
  const { RenameKey, handleShow: handleShowRename } = useRenameKeyModal();
  const { ExpireKey, handleShow: handleShowExpire } = useExpireKeyModal();

  const {
    value: redisValue,
    key: redisKey,
    hasConnection,
  } = useAppSelector<SelectorState>((state) => ({
    key: state.redis.selectedKey,
    value: state.redis.value || '',
    hasConnection: Boolean(state.redis.name),
  }));

  // const [canSave, setCanSave] = React.useState(false);

  const monacoEditor = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const [size, setSize] = React.useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  const [language, setLanguage] = React.useState('text');

  const monacoContainer = React.useRef<HTMLDivElement>();

  const ipc = useIpc();
  const dispatch = useAppDispatch();

  const hasKey = Boolean(redisKey);

  // const handleTrackChanges = React.useCallback(() => {
  //   const exact = redisValue === monacoEditor.current.getValue();

  //   if (!exact) setCanSave(true);
  // }, [redisValue]);

  React.useEffect(() => {
    if (!redisKey && monacoEditor.current) {
      monacoEditor.current.dispose();
      monacoEditor.current = null;
    } else if (!redisKey) return;

    if (!monacoContainer.current) return;

    if (!monacoEditor.current) {
      monacoEditor.current = monaco.editor.create(monacoContainer.current, {
        value: '',
        language,
        minimap: {
          enabled: false,
        },
      });
    } else {
      setLanguage('text');
    }

    if (changeTracker.current) changeTracker.current.dispose();

    // changeTracker.current = monacoEditor.current.onDidChangeModelContent(handleTrackChanges);
  }, [redisKey]);

  React.useEffect(() => {
    if (!monacoEditor.current) return;

    const model = monacoEditor.current.getModel();

    monaco.editor.setModelLanguage(model, language);
  }, [language]);

  React.useEffect(() => {
    if (!monacoEditor.current) return;

    monacoEditor.current.layout();
  }, [size]);

  React.useEffect(() => {
    if (!monacoEditor.current) return;

    if (monacoEditor.current.getValue() !== redisValue) {
      monacoEditor.current.setValue(redisValue);
    }
  }, [redisValue]);

  const calculateBounds = React.useCallback(() => {
    const width = document.querySelector('#value-container')?.clientWidth ?? 0;

    const height =
      (document.querySelector('#value-container')?.clientHeight ?? 0) -
      ((document.querySelector('#editor-toolbar') as HTMLElement)?.offsetTop ?? 0) -
      64;

    setSize({ width, height });
  }, []);

  React.useEffect(() => {
    calculateBounds();

    window.addEventListener('resize', calculateBounds);

    return () => {
      window.removeEventListener('resize', calculateBounds);
    };
  }, [hasKey]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleSave = async () => {
    const value = monacoEditor.current.getValue();

    void ipc.setValue(redisKey, value);

    dispatch(redisActions.setRedisKeySelection({ key: redisKey, value }));
  };

  const handleRefresh = async () => {
    const { value } = await ipc.getValue(redisKey);

    dispatch(redisActions.setRedisKeySelection({ key: redisKey, value }));

    monacoEditor.current.setValue(value);
  };

  const handleRemove = async () => {
    const confirmed = await handleShow(`Are you sure you wish to remove the key "${redisKey}"?`);

    if (!confirmed) return;

    void ipc.removeKeys(redisKey);

    dispatch(redisActions.removeKey(redisKey));
  };

  const handleRename = async () => {
    const newName = await handleShowRename(redisKey);

    if (!newName) return;

    void ipc.renameKey(redisKey, newName);

    dispatch(redisActions.renameKey({ oldName: redisKey, newName }));
  };

  const handleExpire = async () => {
    const newExpiry = await handleShowExpire();

    if (!newExpiry && newExpiry !== 0) return;

    void ipc.setKeyExpiry(redisKey, newExpiry);
  };

  if (!hasConnection) return null;

  return (
    <ValueContainer id="value-container" style={{ height: '100vh' }} xs={6} className={props.className} item>
      <Header title="Editor" />
      <EditorToolbar
        id="editor-toolbar"
        disabled={!hasKey}
        language={language}
        onDelete={handleRemove}
        onExpire={handleExpire}
        onRefresh={handleRefresh}
        onRename={handleRename}
        onSave={handleSave}
        onLanguageChange={handleLanguageChange}
      />
      {redisKey && <div style={{ ...size }} ref={monacoContainer} />}
      <Confirm />
      <ExpireKey />
      <RenameKey />
    </ValueContainer>
  );
};

export default ValueDetail;
