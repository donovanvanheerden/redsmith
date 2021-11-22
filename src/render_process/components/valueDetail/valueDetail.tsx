import * as React from 'react';
import { IconButton, MenuItem, SelectChangeEvent, Toolbar, Tooltip, Typography } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import * as monaco from 'monaco-editor';
import '../../disabledActions';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useIpc } from '../../hooks/useFromDi';
import { redisActions } from '../../store/reducers/redis-slice';

import useConfirmModal from '../../hooks/useConfirmModal';
import useRenameKeyModal from '../../hooks/useRenameKey';
import useExpireKeyModal from '../../hooks/useExpireKey';

import { ButtonToolbar, LanguageSelector, ValueContainer, ValueHeader } from './valueDetail.styles';

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

  const [canSave, setCanSave] = React.useState(false);

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

  const handleTrackChanges = React.useCallback(() => {
    const exact = redisValue === monacoEditor.current.getValue();

    if (!exact) setCanSave(true);
  }, [redisValue]);

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
      });
    } else {
      setLanguage('text');
    }

    if (changeTracker.current) changeTracker.current.dispose();

    changeTracker.current = monacoEditor.current.onDidChangeModelContent(handleTrackChanges);
  }, [redisKey, handleTrackChanges]);

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
      ((document.querySelector('#value-toolbar') as HTMLElement)?.offsetTop ?? 0) -
      120;

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
    setCanSave(false);

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
      <ValueHeader title="Value Detail" />
      <ButtonToolbar id="value-toolbar">
        <Tooltip title="Save">
          <span>
            <IconButton onClick={handleSave} disabled={!hasKey || !canSave} size="large">
              <SaveOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Refresh">
          <span>
            <IconButton onClick={handleRefresh} disabled={!hasKey} size="large">
              <CachedOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Set Expiration">
          <span>
            <IconButton onClick={handleExpire} disabled={!hasKey} size="large">
              <ScheduleOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Rename Key">
          <span>
            <IconButton onClick={handleRename} disabled={!hasKey} size="large">
              <EditOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete">
          <span>
            <IconButton onClick={handleRemove} disabled={!hasKey} size="large">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </ButtonToolbar>

      {redisKey && (
        <React.Fragment>
          <div style={{ ...size }} ref={monacoContainer} />
          <div style={{ display: 'flex', zIndex: 999 }}>
            <Toolbar id="language-change">
              <Typography>Language: </Typography>
              <LanguageSelector value={language} onChange={handleLanguageChange}>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="json">JSON</MenuItem>
                <MenuItem value="xml">XML</MenuItem>
              </LanguageSelector>
            </Toolbar>
          </div>
        </React.Fragment>
      )}
      <Confirm />
      <ExpireKey />
      <RenameKey />
    </ValueContainer>
  );
};

export default ValueDetail;
