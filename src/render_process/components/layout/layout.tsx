import { Grid } from '@mui/material';
import React from 'react';

import { KeyList } from '../keyList';
import { SideNav } from '../sideNav';
import { ValueDetail } from '../valueDetail';

import { Root } from './layout.styles';
import { Form } from '../form';

const Layout = (): JSX.Element => (
  <React.Fragment>
    <Form />
    <Root>
      <SideNav />
      <Grid container>
        <KeyList />
        <ValueDetail />
      </Grid>
    </Root>
  </React.Fragment>
);

export default Layout;
