import { Grid } from '@material-ui/core';
import React, { useState } from 'react';

import { KeyList } from '../keyList';
import { SideNav } from '../sideNav';
import { ValueDetail } from '../valueDetail';

import WebIpc, { IWebIpc } from '../../infra/WebIpc';

import useStyles from './layout.styles';

const Layout = (): JSX.Element => {
  const classes = useStyles();

  const [webIpc, setWebIpc] = useState<IWebIpc>(undefined);

  React.useEffect(() => {
    setWebIpc(new WebIpc());
  }, []);

  return (
    <div className={classes.root}>
      <SideNav ipc={webIpc} />
      <Grid className={classes.content} container>
        <KeyList ipc={webIpc} />
        <ValueDetail />
      </Grid>
    </div>
  );
};

export default Layout;
