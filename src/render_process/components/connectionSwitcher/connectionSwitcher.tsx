import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Connection } from '../../../core/interfaces';
import { useIpc } from '../../hooks/useFromDi';
import { RootState } from '../../store';
import { connectionActions } from '../../store/reducers/connection-slice';
import { formActions } from '../../store/reducers/form-slice';
import { redisActions } from '../../store/reducers/redis-slice';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AddIcon from '@mui/icons-material/Add';

import { Root } from './connectionSwitcher.styles';

import ConnectionBlock from './connectionBlock/connectionBlock';

interface SelectorState {
  connections: Record<string, Connection>;
  connectionName: string;
}

const ConnectionSwitcher = () => {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  // this could just be in local state instead of redux... but anyway
  const { connections, connectionName } = useSelector<RootState, SelectorState>(
    (state) => ({
      connections: state.connection,
      connectionName: state.redis.name,
    })
  );

  const ipc = useIpc();

  const dispatch = useDispatch();

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
    console.log(
      'this should change connection or create connection to: ',
      name
    );

    const response = await ipc.connect(connections[name]);

    dispatch(redisActions.setOnConnected(response));
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
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
          onRightClick={handleContextMenu}
        />
      ))}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Connect</MenuItem>
        <MenuItem onClick={handleClose}>Disconnect</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Root>
  );
};

export default ConnectionSwitcher;
