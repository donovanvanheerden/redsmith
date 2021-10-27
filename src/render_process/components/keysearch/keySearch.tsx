import * as React from "react";
import useStyles from "./keySearch.styles";
import clsx from "clsx";
import { RootState } from "../../store";

import { useDispatch, useSelector } from "react-redux";
import { redisActions } from "../../store/reducers/redis-slice";

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

enum SearchOption {
  Containing = 1,
  StartingWith = 2,
  EndingWith = 3,
  MatchingPattern = 4
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

    var filteredKeys = [...keys].filter((key) =>
      key.toLowerCase().includes(searchKey.toLowerCase())
    );
    console.log("filtered keys:", filteredKeys);

    dispatch(redisActions.filterKeys(filteredKeys));
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
      <form onSubmit={handleSearch}>
        <TextField
          id="filled-search"
          name="searchKey"
          label="Search field"
          type="search"
          variant="filled"
        /> &nbsp;&nbsp;
      <FormControl>
        <InputLabel id="filters-label">Search Filters</InputLabel>
        <Select
          labelId="filters-label"
          id="filters"
          value={age}
          onChange={handleFilterChange}
        >
          <MenuItem value={SearchOption.Containing}>Containing</MenuItem>
          <MenuItem value={SearchOption.StartingWith}>Starting With</MenuItem>
          <MenuItem value={SearchOption.EndingWith}>Ending With</MenuItem>
          <MenuItem value={SearchOption.MatchingPattern}>Matching Pattern</MenuItem>
        </Select>
      </FormControl>
      &nbsp;&nbsp;
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
  );
};

export default KeySearch;
