import * as React from "react";
import useStyles from "./keySearch.styles";
import clsx from "clsx";
import { RootState } from "../../store";

import { useDispatch, useSelector } from 'react-redux';
import { redisActions } from '../../store/reducers/redis-slice';


import {
  Button,
  TextField,
} from "@material-ui/core";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const KeySearch = ({ className }: Props): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const keys = useSelector<RootState, string[]>((state) => state.redis.keys);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchKey = formData.get("searchKey").toString();
    console.log("searchKey:", searchKey);

    var filteredKeys = [...keys].filter(key => key.toLowerCase().includes(searchKey.toLowerCase()));
    console.log("filtered keys:", filteredKeys);

    dispatch(redisActions.filterKeys(filteredKeys));
  };

  return (
      <form onSubmit={handleSearch}>
        <TextField
          id="filled-search"
          name="searchKey"
          label="Search field"
          type="search"
          variant="filled"
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
  );
};

export default KeySearch;
