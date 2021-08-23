import * as React from 'react';
import useStyles from './keyList.styles';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { IWebIpc } from '../../infra/WebIpc';

import { Header } from '../header';

interface Props {
  className?: string;
  children?: React.ReactNode;
  ipc: IWebIpc;
}

const KeyList = ({ className, ipc }: Props): JSX.Element => {
  const classes = useStyles();

  const [keys, setKeys] = React.useState([]);

  const getKeys = React.useCallback(async () => {
    if (!ipc) return;

    const keys = await ipc.keys();

    setKeys(keys);
  }, [ipc]);

  React.useEffect(() => {
    getKeys();
  }, [ipc]);

  return (
    <Grid xs={6} className={clsx(classes.root, className)} item>
      <Header title="Keys" />
      <ul className={classes.keys}>
        {keys.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </Grid>
  );
};

export default KeyList;
