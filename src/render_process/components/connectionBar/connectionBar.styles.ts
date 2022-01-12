import { styled } from '@mui/material';
import redConnectionButtonClasses from '../connectionButton/connectionButtonClasses';

export const Root = styled('div')(({ theme: { palette, spacing } }) => ({
  backgroundColor: palette.grey[900],
  height: `calc(100vh - ${spacing(4)})`,
  width: spacing(10),
  padding: spacing(),
  display: 'flex',
  flexDirection: 'column',
  [`& .${redConnectionButtonClasses.root}:last-of-type`]: {
    marginTop: 'auto',
  },
}));
