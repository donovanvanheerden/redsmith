import { styled } from '@mui/material';
import redConnectionButtonClasses from '../connectionButton/connectionButtonClasses';

export const Root = styled('div')(({ theme: { palette, spacing } }) => ({
  backgroundColor: palette.grey[900],
  height: '100vh',
  width: spacing(10),
  padding: spacing(),
  display: 'flex',
  flexDirection: 'column',
  [`& .${redConnectionButtonClasses.root}:last-of-type`]: {
    marginTop: 'auto',
  },
}));
