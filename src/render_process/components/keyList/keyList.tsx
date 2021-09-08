import * as React from 'react';
import useStyles from './keyList.styles';
import clsx from 'clsx';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';

import { Header } from '../header';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const KeyList = ({ className }: Props): JSX.Element => {
  const classes = useStyles();
  const keys = useSelector<RootState, string[]>((state) => state.redis.keys);

  const [height, setHeight] = React.useState(0);

  const calculateHeight = React.useCallback(() => {
    const height =
      document.querySelector('#key-container').clientHeight -
      (document.querySelector('#key-list') as HTMLElement).offsetTop;

    setHeight(height);
  }, []);

  React.useEffect(() => {
    calculateHeight();

    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <Grid
      id="key-container"
      xs={6}
      className={clsx(classes.root, className)}
      item
    >
      <Header title="Keys" />
      <List
        id="key-list"
        style={{ height, overflowY: 'scroll' }}
        className={classes.keys}
      >
        {keys.map((key) => (
          <ListItem button key={key}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default KeyList;
