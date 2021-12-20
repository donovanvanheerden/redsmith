import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { redisActions } from '../../store/reducers/redis-slice';

import { IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Form, SearchButton, SearchField } from './keysSearch.styles';

// enum SearchOption {
//   Containing = 1,
//   StartingWith = 2,
//   EndingWith = 3,
//   MatchingPattern = 4,
// }

const KeysSearch = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // const [filter, setFilter] = React.useState(SearchOption.Containing);

  const keys = useAppSelector<string[]>((state) => state.redis.keys);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchKey = formData.get('searchKey').toString();

    const filteredKeys = [...keys].filter((key) => key.toLowerCase().includes(searchKey.toLowerCase()));

    dispatch(redisActions.filterKeys(filteredKeys));
  };

  // const handleFilterChange = (event: SelectChangeEvent<SearchOption>) => {
  //   setFilter(event.target.value as SearchOption);
  // };

  return (
    <Form onSubmit={handleSearch}>
      <SearchField
        id="filled-search"
        name="searchKey"
        placeholder="Search"
        size="small"
        endAdornment={
          <IconButton>
            <TuneIcon />
          </IconButton>
        }
      />
      {/* <FormControl> */}
      {/* <InputLabel id="filters-label">Search Filters</InputLabel> */}
      {/* <Select labelId="filters-label" id="filters" value={filter} onChange={handleFilterChange}>
          <MenuItem value={`${SearchOption.Containing}`}>Containing</MenuItem>
          <MenuItem value={SearchOption.StartingWith}>Starting With</MenuItem>
          <MenuItem value={SearchOption.EndingWith}>Ending With</MenuItem>
          <MenuItem value={SearchOption.MatchingPattern}>Matching Pattern</MenuItem>
        </Select> */}
      {/* </FormControl> */}
      <SearchButton variant="contained" color="primary" disableElevation type="submit">
        <SearchIcon />
      </SearchButton>
    </Form>
  );
};

export default KeysSearch;
