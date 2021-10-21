import { Grid } from '@mui/material';
import React from 'react';

import { KeyList } from '../keyList';
import { SideNav } from '../sideNav';
import { ValueDetail } from '../valueDetail';

import useStyles from './layout.styles';
import { Form } from '../form';

const Layout = (): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Form />
      <div className={classes.root}>
        <SideNav />
        <Grid className={classes.content} container>
          <KeyList />
          <ValueDetail />
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Layout;
