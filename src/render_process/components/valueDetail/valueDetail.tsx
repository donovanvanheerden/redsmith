import * as React from 'react';
import { SelectChangeEvent, useTheme } from '@mui/material';

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
import { Settings } from '../../../core/interfaces';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface SelectorState {
  value: string;
  key: string;
  hasConnection: boolean;
  settings: Settings;
}

const ValueDetail = (props: Props): JSX.Element => {
  const changeTracker = React.useRef<monaco.IDisposable>();

  const theme = useTheme();

  const { Confirm, handleShow } = useConfirmModal();
  const { RenameKey, handleShow: handleShowRename } = useRenameKeyModal();
  const { ExpireKey, handleShow: handleShowExpire } = useExpireKeyModal();

  const {
    value: redisValue,
    key: redisKey,
    hasConnection,
    settings,
  } = useAppSelector<SelectorState>((state) => ({
    key: state.redis.selectedKey,
    value: state.redis.value || '',
    hasConnection: Boolean(state.redis.name),
    settings: state.settings,
  }));

  // const [canSave, setCanSave] = React.useState(false);

  const monacoEditor = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const [size, setSize] = React.useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  const [language, setLanguage] = React.useState(settings.preferredLanguage);

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
        theme: theme.palette.mode === 'dark' ? 'vs-dark' : 'vs',
      });
    } else {
      setLanguage(settings.preferredLanguage);
    }

    if (changeTracker.current) changeTracker.current.dispose();

    // changeTracker.current = monacoEditor.current.onDidChangeModelContent(handleTrackChanges);
  }, [redisKey]);

  React.useEffect(() => {
    if (language !== settings.preferredLanguage) setLanguage(settings.preferredLanguage);
  }, [settings.preferredLanguage]);

  React.useEffect(() => {
    if (!monacoEditor.current) return;

    const model = monacoEditor.current.getModel();

    monaco.editor.setModelLanguage(model, language);

    if (settings.autoFormat) {
      monacoEditor.current.getAction('editor.action.formatDocument').run();
    }
  }, [settings.autoFormat, language]);

  React.useEffect(() => {
    if (!monacoEditor.current) return;

    monacoEditor.current.layout();
  }, [size]);

  React.useEffect(() => {
    if (!monacoEditor.current) return;
    if (monacoEditor.current.getValue() === redisValue) return;

    monacoEditor.current.setValue(redisValue);

    if (settings.autoFormat) {
      monacoEditor.current.getAction('editor.action.formatDocument').run();
    }
  }, [settings.autoFormat, redisValue]);

  const calculateBounds = React.useCallback(() => {
    const width = document.querySelector('#value-container')?.clientWidth - 32 ?? 0;

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
    setLanguage(event.target.value as Settings['preferredLanguage']);
  };

  const handleSave = async () => {
    const value = monacoEditor.current.getValue();

    // to get format errors
    //console.log(monaco.editor.getModelMarkers({}));

    void ipc.setValue(redisKey, value);

    dispatch(redisActions.setRedisKeySelection({ key: redisKey, value }));
  };

  const handleRefresh = async () => {
    const { value } = await ipc.getValue(redisKey);

    dispatch(redisActions.setRedisKeySelection({ key: redisKey, value }));

    monacoEditor.current.setValue(value);

    if (settings.autoFormat) {
      monacoEditor.current.getAction('editor.action.formatDocument').run();
    }
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
        onDelete={handleRemove}
        onExpire={handleExpire}
        onRefresh={handleRefresh}
        onRename={handleRename}
        onSave={handleSave}
        onLanguageChange={handleLanguageChange}
      />
      {redisKey && <div style={{ ...size, margin: 'auto' }} ref={monacoContainer} />}
      <Confirm />
      <ExpireKey />
      <RenameKey />
    </ValueContainer>
  );
};

export default ValueDetail;
