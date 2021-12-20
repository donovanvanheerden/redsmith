import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

interface Props {
  keyName: string;
  onClick?: () => void;
}

const KeyItem = ({ keyName, onClick }: Props) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemText primary={keyName} />
    </ListItemButton>
  );
};
export default KeyItem;
