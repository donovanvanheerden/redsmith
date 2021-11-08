import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Connection } from '../../../core/interfaces';
import { useIpc } from '../../hooks/useFromDi';
import { RootState } from '../../store';
import { connectionActions } from '../../store/reducers/connection-slice';
import { formActions } from '../../store/reducers/form-slice';
import { redisActions } from '../../store/reducers/redis-slice';

import AddIcon from '@mui/icons-material/Add';

import { ConnectionBlock, Root } from './connectionSwitcher.styles';

interface SelectorState {
  connections: Record<string, Connection>;
  connectionName: string;
}

const ConnectionSwitcher = () => {
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

  return (
    <Root>
      <Tooltip title="Create Connection" placement="right">
        <ConnectionBlock>
          <IconButton
            color="inherit"
            onClick={handleNewConnection}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </ConnectionBlock>
      </Tooltip>
      {Object.keys(connections).map((name) => {
        let label = name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase();

        if (label.length === 1) label = name.substr(0, 3).toUpperCase();

        return (
          <Tooltip key={name} title={name} placement="right">
            <ConnectionBlock
              active={name === connectionName}
              onClick={handleSwitchConnection(name)}
            >
              {label}
            </ConnectionBlock>
          </Tooltip>
        );
      })}
    </Root>
  );
};

export default ConnectionSwitcher;
