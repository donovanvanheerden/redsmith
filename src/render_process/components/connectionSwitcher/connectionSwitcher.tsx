import { IconButton } from '@mui/material';
import React from 'react';
import { Connection } from '../../../core/interfaces';
import { useIpc } from '../../hooks/useFromDi';
import { connectionActions } from '../../store/reducers/connection-slice';
import { formActions } from '../../store/reducers/form-slice';
import { redisActions } from '../../store/reducers/redis-slice';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AddIcon from '@mui/icons-material/Add';

import { Root } from './connectionSwitcher.styles';

import ConnectionBlock from './connectionBlock/connectionBlock';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface SelectorState {
  connections: Record<string, Connection>;
  connectionName: string;
}

const ConnectionSwitcher = () => {
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

  const dispatch = useAppDispatch();

  const fetchConnections = React.useCallback(async () => {
    const connections = await ipc.getConnections();

    dispatch(connectionActions.setConnections(connections));
  }, []);

  React.useEffect(() => {
    fetchConnections();
  }, []);

  const handleNewConnection = () => {
    const connection = {
      formOpen: true,
      name: '',
      host: '',
      port: 0,
    };

    dispatch(formActions.showForm(connection));
  };

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

  const handleDisconnect = () => {
    console.log('I need to implement disconnecting from: ', contextMenu.connection.name);
  };

  const handleEditConnection = () => {
    console.log('I need to implement editing connection: ', contextMenu.connection.name);
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Root>
      <ConnectionBlock title="Create Connection">
        <IconButton color="inherit" onClick={handleNewConnection} size="large">
          <AddIcon />
        </IconButton>
      </ConnectionBlock>
      {Object.keys(connections).map((name) => (
        <ConnectionBlock
          key={name}
          title={name}
          active={name === connectionName}
          onClick={handleSwitchConnection(name)}
          onRightClick={handleContextMenu(connections[name])}
        />
      ))}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
        <MenuItem onClick={handleEditConnection}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Root>
  );
};

export default ConnectionSwitcher;
