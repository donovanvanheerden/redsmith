import * as React from 'react';
import useStyles from './valueDetail.styles';
import clsx from 'clsx';
import {
  Grid,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';

import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Header } from '../header';

import * as monaco from 'monaco-editor';
import '../../disabledActions';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useIpc } from '../../hooks/useFromDi';
import { redisActions } from '../../store/reducers/redis-slice';
import useConfirmModal from '../../hooks/useConfirmModal';
import useRenameKeyModal from '../../hooks/useRenameKey';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface SelectorState {
  value: string;
  key: string;
}

const ValueDetail = (props: Props): JSX.Element => {
  const changeTracker = React.useRef<monaco.IDisposable>();
  const { Confirm, handleShow } = useConfirmModal();
  const { RenameKey, handleShow: handleShowRename } = useRenameKeyModal();

  const { value: redisValue, key: redisKey } = useSelector<
    RootState,
    SelectorState
  >((state) => ({
    key: state.redis.selectedKey,
    value: state.redis.value || '',
  }));

  const [canSave, setCanSave] = React.useState(false);

  const monacoEditor = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const [size, setSize] = React.useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  const [language, setLanguage] = React.useState('text');

  const monacoContainer = React.useRef<HTMLDivElement>();
  const classes = useStyles();

  const ipc = useIpc();
  const dispatch = useDispatch();

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

    changeTracker.current =
      monacoEditor.current.onDidChangeModelContent(handleTrackChanges);
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
    const width = document.querySelector('#value-container').clientWidth;
    const height =
      document.querySelector('#value-container').clientHeight -
      (document.querySelector('#value-toolbar') as HTMLElement).offsetTop -
      100;

    setSize({ width, height });
  }, []);

  React.useEffect(() => {
    calculateBounds();

    window.addEventListener('resize', calculateBounds);

    return () => {
      window.removeEventListener('resize', calculateBounds);
    };
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
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
    const confirmed = await handleShow(
      `Are you sure you wish to remove the key "${redisKey}"?`
    );

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

  return (
    <Grid
      id="value-container"
      style={{ height: '100vh' }}
      xs={6}
      className={clsx(classes.root, props.className)}
      item
    >
      <Header title="Value Detail" className={classes.heading} />
      <Toolbar id="value-toolbar" className={classes.buttonToolbar}>
        <Tooltip title="Save">
          <span>
            <IconButton onClick={handleSave} disabled={!hasKey || !canSave}>
              <SaveOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Refresh">
          <span>
            <IconButton onClick={handleRefresh} disabled={!hasKey}>
              <CachedOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Set Expiration">
          <span>
            <IconButton disabled={!hasKey}>
              <ScheduleOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Rename Key">
          <span>
            <IconButton onClick={handleRename} disabled={!hasKey}>
              <EditOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete">
          <span>
            <IconButton onClick={handleRemove} disabled={!hasKey}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>

      {redisKey && (
        <React.Fragment>
          <div style={{ ...size }} ref={monacoContainer} />
          <div style={{ display: 'flex', zIndex: 999 }}>
            <Toolbar id="language-change">
              <Typography>Language: </Typography>
              <Select value={language} onChange={handleLanguageChange}>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="json">JSON</MenuItem>
                <MenuItem value="xml">XML</MenuItem>
              </Select>
            </Toolbar>
          </div>
        </React.Fragment>
      )}
      <Confirm />
      <RenameKey />
    </Grid>
  );
};

export default ValueDetail;
