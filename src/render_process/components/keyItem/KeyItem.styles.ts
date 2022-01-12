import { alpha, styled, ListItemButton, listItemTextClasses } from '@mui/material';
import redKeyItemClasses from './KeyItemClasses';

export const KeyRoot = styled(ListItemButton, {
  name: 'RedKeyItem',
  slot: 'Root',
  overridesResolver: (props, styles) => [styles.root],
})(({ theme: { palette, spacing } }) => ({
  width: `calc(100% - 16px)`,
  ['&:hover']: {
    backgroundColor: alpha(palette.grey[800], 0.4),
    borderRadius: spacing(),
  },
  [`.${listItemTextClasses.primary}`]: {
    fontSize: '10pt',
    color: alpha(palette.getContrastText(palette.grey[700]), 0.6),
  },
  [`&.${redKeyItemClasses.selected}`]: {
    backgroundColor: palette.grey[800],
    borderRadius: spacing(),
    [`.${listItemTextClasses.primary}`]: {
      color: palette.getContrastText(palette.grey[700]),
    },
  },
}));
