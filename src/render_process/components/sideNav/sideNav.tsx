import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AddIcon from '@material-ui/icons/Add';

import useStyles from './sideNav.styles';
import { Tooltip } from '@material-ui/core';
import { useIpc } from '../../hooks/useFromDi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DbInfo } from '../../../core/interfaces';
import { redisActions } from '../../store/reducers/redis-slice';
import { formActions } from '../../store/reducers/form-slice';

interface SelectorState {
  dbs: DbInfo[];
  selectedDb: number;
}

const SideNav = (): JSX.Element => {
  const classes = useStyles();

  const { dbs, selectedDb } = useSelector<RootState, SelectorState>(
    (state) => ({ dbs: state.redis.dbs, selectedDb: state.redis.selectedDb })
  );
  const dispatch = useDispatch();

  const ipc = useIpc();

  const handleCreateConnection = React.useCallback(async () => {
    const connection = {
      formOpen: true,
      name: '',
      host: '',
      port: 0,
    };

    dispatch(formActions.showForm(connection));
  }, []);

  const handleSwitchDb = (db: DbInfo) => async () => {
    const keys = await ipc.switchDb(db);

    dispatch(redisActions.switchDb({ keys, selectedDb: db.index }));
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, classes.drawerClose)}
      classes={{
        paper: clsx(classes.drawerClose),
      }}
      PaperProps={{
        style: {
          width: '100%',
          position: 'relative',
        },
      }}
    >
      <div className={classes.toolbar}>
        <Tooltip title="Create Connection" placement="right">
          <IconButton onClick={handleCreateConnection}>
            <AddIcon />
          </IconButton>
        </Tooltip>
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
      </div>
    </Drawer>
  );
};

export default SideNav;
