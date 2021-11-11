import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme: { spacing } }) => ({
  height: '100vh',
  width: spacing(10),
  padding: spacing(),
  backgroundColor: '#333',
  display: 'flex',
  flexDirection: 'column',
}));
