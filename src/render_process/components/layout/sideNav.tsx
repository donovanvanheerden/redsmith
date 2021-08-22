import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StorageIcon from '@material-ui/icons/Storage';

import AddIcon from '@material-ui/icons/Add';

import useStyles from './sideNav.styles';
import { Tooltip } from '@material-ui/core';
import WebIpc, { IWebIpc } from '../../infra/WebIpc';

const SideNav = (): JSX.Element => {
  const classes = useStyles();

  let webIpc: IWebIpc;

  React.useEffect(() => {
    webIpc = new WebIpc();
  }, []);

  const handleCreateConnection = async () => {
    console.log({
      name: 'localhost',
      address: '127.0.0.1',
      port: '5379',
    });

    const syncValue = webIpc.send('localhost');
    const asyncValue = await webIpc.sendAsync('localhost');

    console.log('syncValue: ', syncValue);
    console.log('asyncValue: ', asyncValue);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, classes.drawerClose)}
      classes={{
        paper: clsx(classes.drawerClose),
      }}
    >
      <div className={classes.toolbar}>
        <Tooltip title="Create Connection" placement="right">
          <IconButton onClick={handleCreateConnection}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
