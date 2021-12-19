import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { DbInfo } from '../../../core/interfaces';

interface Props extends DbInfo {
  selected?: boolean;
  onClick?: () => void;
}

const DbItem = ({ keys, name, selected, onClick }: Props) => {
  return (
    <ListItem
      style={{
        padding: 0,
        margin: 0,
        backgroundColor: selected ? '#fafafa' : 'unset',
      }}
      button
      key={name}
      onClick={onClick}
    >
      <ListItemText
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '4px 8px',
        }}
        primary={name}
        primaryTypographyProps={{
          style: { fontWeight: selected ? 600 : 400 },
        }}
        secondary={`${keys} keys`}
        secondaryTypographyProps={{
          style: { fontWeight: selected ? 600 : 400 },
        }}
      />
    </ListItem>
  );
};

export default DbItem;
