import { Grid } from '@mui/material';
import React from 'react';

import { KeysPanel } from '../keysPanel';

import { ValueDetail } from '../valueDetail';

import { Root } from './layout.styles';

import { ConnectionBar } from '../connectionBar';
import { DbSelector } from '../dbSelector';

const Layout = (): JSX.Element => (
    <Root>
      <ConnectionBar />
      <DbSelector />
      <Grid container>
        <KeysPanel />
        <ValueDetail />
      </Grid>
    </Root>
);

export default Layout;
