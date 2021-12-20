import { alpha, styled, Button, InputBase, iconButtonClasses } from '@mui/material';

export const Form = styled('form')(({ theme: { spacing } }) => ({
  display: 'flex',
  width: '100%',
  padding: spacing(1, 1),
}));

export const SearchField = styled(InputBase, {
  name: 'RedSearchField',
  slot: 'Root',
})(({ theme: { palette, spacing } }) => ({
  color: palette.common.white,
  backgroundColor: alpha(palette.grey[800], 0.8),
  borderRadius: spacing(2, 0, 0, 2),
  padding: spacing(0.5, 0.5, 0.5, 1.5),
  minWidth: spacing(40),
  flexGrow: 1,
  [`& > .${iconButtonClasses.root}`]: {
    borderRadius: spacing(0.5),
    color: 'inherit',
    padding: spacing(0.5),
  },
}));

export const SearchButton = styled(Button, {
  name: 'RedSearchButton',
  slot: 'Root',
})(({ theme: { spacing } }) => ({
  borderRadius: spacing(0, 2, 2, 0),
  minWidth: spacing(6),
}));
