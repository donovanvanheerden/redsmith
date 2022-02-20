import { IconButton } from '@mui/material';
import React from 'react';
import { Connection } from '../../../core/interfaces';
import { useIpc } from '../../hooks/useFromDi';
import { connectionActions } from '../../store/reducers/connection-slice';
import { redisActions } from '../../store/reducers/redis-slice';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

import { Root } from './connectionBar.styles';

import ConnectionButton from '../connectionButton/connectionButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useSettingsModal from '../../hooks/useSettings';
import { settingsActions } from '../../store/reducers/settings-slice';
import useNewConnectionModal from '../../hooks/useNewConnection';

interface SelectorState {
  connections: Record<string, Connection>;
  connectionName: string;
}

const ConnectionBar = () => {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
    connection?: Connection;
  } | null>(null);

  // this could just be in local state instead of redux... but anyway
  const { connections, connectionName } = useAppSelector<SelectorState>((state) => ({
    connections: state.connection,
    connectionName: state.redis.name,
  }));

  const ipc = useIpc();

  const { handleEdit, handleShow, NewConnection } = useNewConnectionModal();

  const { handleOpen, Settings } = useSettingsModal();

  const dispatch = useAppDispatch();

  const fetchSettingsAndConnections = React.useCallback(async () => {
    const connections = await ipc.getConnections();
    const settings = await ipc.getSettings();

    dispatch(connectionActions.setConnections(connections));
    dispatch(settingsActions.saveSettings(settings));
  }, []);

  React.useEffect(() => {
    fetchSettingsAndConnections();
  }, []);

  const handleSwitchConnection = (name: string) => async () => {
    console.log('this should change connection or create connection to: ', name);

    const response = await ipc.connect(connections[name]);

    dispatch(redisActions.setOnConnected(response));
  };

  const handleContextMenu = (connection: Connection) => (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            connection,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleDelete = async () => {
    try {
      void ipc.deleteConnection(contextMenu.connection.name);

      dispatch(connectionActions.deleteConnection(contextMenu.connection));

      setContextMenu(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisconnect = async () => {
    await ipc.disconnect();

    dispatch(redisActions.disconnect());

    setContextMenu(null);
  };

  const handleEditConnection = async () => {
    setContextMenu(null);

    await handleEdit(contextMenu.connection);
    // console.log('I need to implement editing connection: ', contextMenu.connection.name);
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Root>
      <ConnectionButton title="Create Connection">
        <IconButton color="inherit" onClick={handleShow} size="large">
          <AddIcon />
        </IconButton>
      </ConnectionButton>
      {Object.keys(connections).map((name) => (
        <ConnectionButton
          key={name}
          title={name}
          active={name === connectionName}
          onClick={handleSwitchConnection(name)}
          onRightClick={handleContextMenu(connections[name])}
        />
      ))}
      <ConnectionButton title="Settings">
        <IconButton color="inherit" onClick={handleOpen}>
          <SettingsIcon />
        </IconButton>
      </ConnectionButton>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        {contextMenu?.connection?.name === connectionName && <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>}
        <MenuItem onClick={handleEditConnection}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Settings />
      <NewConnection />
    </Root>
  );
};

export default ConnectionBar;
