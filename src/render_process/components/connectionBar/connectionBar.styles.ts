import { styled } from '@mui/material';

export const Root = styled('div')(({ theme: { palette, spacing } }) => ({
  backgroundColor: palette.grey[800],
  height: '100vh',
  width: spacing(10),
  padding: spacing(),
  display: 'flex',
  flexDirection: 'column',
}));
