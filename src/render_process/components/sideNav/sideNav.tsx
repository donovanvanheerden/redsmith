import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { StyledDrawer } from './sideNav.styles';

import { useIpc } from '../../hooks/useFromDi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DbInfo } from '../../../core/interfaces';
import { redisActions } from '../../store/reducers/redis-slice';

interface SelectorState {
  dbs: DbInfo[];
  selectedDb: number;
}

const SideNav = (): JSX.Element => {
  const { dbs, selectedDb } = useAppSelector<SelectorState>((state) => ({
    dbs: state.redis.dbs,
    selectedDb: state.redis.selectedDb,
  }));
  const dispatch = useAppDispatch();

  const ipc = useIpc();

  const handleSwitchDb = (db: DbInfo) => async () => {
    const keys = await ipc.switchDb(db);

    dispatch(redisActions.switchDb({ keys, selectedDb: db.index }));
  };

  return (
    <StyledDrawer variant="permanent">
      <List style={{ width: '100%', padding: 0, margin: 0 }}>
        {dbs.map((db) => (
          <ListItem
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: selectedDb === db.index ? '#fafafa' : 'unset',
            }}
            button
            key={db.name}
            onClick={handleSwitchDb(db)}
          >
            <ListItemText
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 8px',
              }}
              primary={db.name}
              primaryTypographyProps={{
                style: { fontWeight: selectedDb === db.index ? 600 : 400 },
              }}
              secondary={`${db.keys} keys`}
              secondaryTypographyProps={{
                style: { fontWeight: selectedDb === db.index ? 600 : 400 },
              }}
            />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default SideNav;
