import { alpha, styled, Drawer, List, paperClasses, Typography } from '@mui/material';

const drawerWidth = 240;

export const StyledDrawer = styled(Drawer, {
  name: 'RedDbSelector',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root,
})(({ theme: { palette } }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  backgroundColor: palette.grey[800],
  [`& .${paperClasses.root}`]: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'inherit',
    border: 'none',
  },
}));

export const Title = styled(Typography, {
  name: 'RedDbSelector',
  slot: 'Title',
  overridesResolver: (_, styles) => styles.title,
})(({ theme: { palette, spacing, typography } }) => ({
  ...typography.button,
  fontWeight: 500,
  color: alpha(palette.getContrastText(palette.grey[800]), 0.8),
  textAlign: 'center',
  marginTop: spacing(3),
  marginBottom: spacing(12),
}));

export const DbList = styled(List, {
  name: 'RedDbSelector',
  slot: 'List',
  overridesResolver: (_, styles) => styles.list,
})(() => ({
  width: '100%',
  padding: 0,
  margin: 0,
}));
