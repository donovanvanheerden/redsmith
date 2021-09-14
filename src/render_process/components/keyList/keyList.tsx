import * as React from 'react';
import useStyles from './keyList.styles';
import clsx from 'clsx';
import { Button, Grid, List, ListItem, ListItemText, TextField } from '@material-ui/core';

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

  const [searchKey, setsearchKey] = React.useState('');

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

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const newSearchKey = formData.get('searchKey').toString();
    setsearchKey(newSearchKey);

  }

  return (
    <Grid
      id="key-container"
      xs={6}
      className={clsx(classes.root, className)}
      item
    >
      <Header title="Keys" />

      <form onSubmit={handleSearch}>
      <TextField id="filled-search" name="searchKey" label="Search field" type="search" variant="filled" />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
      </form>

      <List
        id="key-list"
        style={{ height, overflowY: 'scroll' }}
        className={classes.keys}
      >
        {keys.filter(key => key.toLowerCase().includes(searchKey.toLowerCase())).map((key) => (
          <ListItem button key={key}>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default KeyList;
