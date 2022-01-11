import { alpha, styled, InputBase, iconButtonClasses, inputBaseClasses } from '@mui/material';

export const RedInputField = styled(InputBase, {
  name: 'RedSearchField',
  slot: 'Root',
})(({ theme: { palette, spacing } }) => ({
  color: palette.common.white,
  backgroundColor: alpha(palette.grey[800], 0.8),
  border: `1px solid ${alpha(palette.common.white, 0.1)}`,
  borderRadius: spacing(0.5),
  padding: spacing(0.5, 0.5, 0.5, 1.5),
  minWidth: spacing(40),
  flexGrow: 1,
  [`span &:first-of-type`]: {
    borderRadius: spacing(0.5, 0, 0, 0.5),
  },
  [`span &:last-of-type`]: {
    minWidth: spacing(12),
    borderRadius: spacing(0, 0.5, 0.5, 0),
  },
  [`& > .${iconButtonClasses.root}`]: {
    borderRadius: spacing(0.5),
    color: 'inherit',
    padding: spacing(0.5),
  },
  [`& .${inputBaseClasses.input}`]: {
    padding: 0,
  },
}));
