import { Grid } from '@mui/material';
import React from 'react';

import { KeyList } from '../keyList';

import { ValueDetail } from '../valueDetail';

import { Root } from './layout.styles';
import { ConnectionForm } from '../connectionform';

import { ConnectionBar } from '../connectionBar';
import { DbSelector } from '../dbSelector';

const Layout = (): JSX.Element => (
  <React.Fragment>
    <ConnectionForm />
    <Root>
      <ConnectionBar />
      <DbSelector />
      <Grid container>
        <KeyList />
        <ValueDetail />
      </Grid>
    </Root>
  </React.Fragment>
);

export default Layout;
