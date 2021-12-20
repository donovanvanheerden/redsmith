import { alpha, Grid, List as MList } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GridWrapper = styled(Grid)(({ theme: { palette, spacing } }) => ({
  minWidth: spacing(28),
  height: '100vh',
  borderRight: `1px solid ${alpha(palette.grey[700], 0.6)}`,
}));

export const List = styled(MList)(() => ({
  overflow: 'hidden',
}));
