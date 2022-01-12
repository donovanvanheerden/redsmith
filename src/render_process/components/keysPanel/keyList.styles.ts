import { alpha, styled, Grid, List as MList } from '@mui/material';

export const GridWrapper = styled(Grid)(({ theme: { palette, spacing } }) => ({
  minWidth: spacing(28),
  height: '100vh',
  borderRight: `1px solid ${alpha(palette.grey[800], 0.6)}`,
}));

export const List = styled(MList)(({ theme: { spacing } }) => ({
  overflow: 'hidden',
  padding: spacing(0, 1),
}));
