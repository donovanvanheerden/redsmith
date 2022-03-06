import * as React from 'react';

import { useAppDispatch } from '../../hooks';
import { redisActions } from '../../store/reducers/redis-slice';

import { IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
// import TuneIcon from '@mui/icons-material/Tune';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Form, SearchButton, SearchField } from './keysSearch.styles';
import { useIpc } from '../../hooks/useFromDi';

// enum SearchOption {
//   Containing = 1,
//   StartingWith = 2,
//   EndingWith = 3,
//   MatchingPattern = 4,
// }

interface Props {
  onNamespaceToggle?: () => void;
}

const KeysSearch = ({ onNamespaceToggle }: Props): JSX.Element => {
  const ipc = useIpc();
  const dispatch = useAppDispatch();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let search = formData.get('searchKey').toString();

    if (!search.startsWith('*')) search = `*${search}`;
    if (!search.endsWith('*')) search = `${search}*`;

    const response = await ipc.getKeys(search);

    dispatch(redisActions.filterKeys(response));
  };

  return (
    <Form onSubmit={handleSearch}>
      <IconButton onClick={onNamespaceToggle}>
        <AccountTreeIcon />
      </IconButton>
      <SearchField
        id="filled-search"
        name="searchKey"
        placeholder="Search"
        size="small"
        // endAdornment={
        //   <IconButton>
        //     <TuneIcon />
        //   </IconButton>
        // }
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
