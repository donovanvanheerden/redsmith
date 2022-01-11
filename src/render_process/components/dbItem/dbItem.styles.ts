import { alpha, ListItemButton, listItemTextClasses, Palette, styled } from '@mui/material';
import redDbItemClasses from './dbItemClasses';

interface Props {
  color?: keyof Pick<Palette, 'primary' | 'secondary'>;
}

export const Root = styled(ListItemButton, {
  name: 'RedDbItem',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'color',
  overridesResolver: (props, styles) => [styles.root, styles[props.color]],
})<Props>(({ color, theme: { palette, spacing } }) => ({
  backgroundColor: 'unset',
  padding: 0,
  [`&.${redDbItemClasses.selected}`]: {
    backgroundColor: palette.grey[700],
  },
  [`&:hover.${redDbItemClasses.selected}`]: {
    backgroundColor: alpha(palette.grey[800], 0.8),
  },
  [`& .${listItemTextClasses.root}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: spacing(0.5, 1),
  },
  [`& .${listItemTextClasses.primary}, & .${listItemTextClasses.secondary}`]: {
    fontSize: '10pt',
    color: palette.grey[400],
    fontWeight: 400,
  },
  [`&.${redDbItemClasses.selected} .${listItemTextClasses.primary}, &.${redDbItemClasses.selected} .${listItemTextClasses.secondary}`]:
    {
      color: palette[color].contrastText,
      fontWeight: 600,
    },
}));
