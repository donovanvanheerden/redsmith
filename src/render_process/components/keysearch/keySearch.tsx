import * as React from 'react';
import { RootState } from '../../store';

import { useDispatch, useSelector } from 'react-redux';
import { redisActions } from '../../store/reducers/redis-slice';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

enum SearchOption {
  Containing = 1,
  StartingWith = 2,
  EndingWith = 3,
  MatchingPattern = 4,
}

const KeySearch = (): JSX.Element => {
  const dispatch = useDispatch();

  const [filter, setFilter] = React.useState(SearchOption.Containing);

  const keys = useSelector<RootState, string[]>((state) => state.redis.keys);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchKey = formData.get('searchKey').toString();

    const filteredKeys = [...keys].filter((key) =>
      key.toLowerCase().includes(searchKey.toLowerCase())
    );

    dispatch(redisActions.filterKeys(filteredKeys));
  };

  const handleFilterChange = (event: SelectChangeEvent<SearchOption>) => {
    setFilter(event.target.value as SearchOption);
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
      <FormControl>
        <InputLabel id="filters-label">Search Filters</InputLabel>
        <Select
          labelId="filters-label"
          id="filters"
          value={filter}
          onChange={handleFilterChange}
        >
          <MenuItem value={`${SearchOption.Containing}`}>Containing</MenuItem>
          <MenuItem value={SearchOption.StartingWith}>Starting With</MenuItem>
          <MenuItem value={SearchOption.EndingWith}>Ending With</MenuItem>
          <MenuItem value={SearchOption.MatchingPattern}>
            Matching Pattern
          </MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </form>
  );
};

export default KeySearch;
