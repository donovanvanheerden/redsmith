import { Grid } from '@material-ui/core';
import React from 'react';

import { KeyList } from '../keyList';
import { SideNav } from '../sideNav';
import { ValueDetail } from '../valueDetail';

import useStyles from './layout.styles';

const Layout = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideNav />
      <Grid className={classes.content} container>
        <KeyList />
        <ValueDetail />
      </Grid>
    </div>
  );
};

export default Layout;
