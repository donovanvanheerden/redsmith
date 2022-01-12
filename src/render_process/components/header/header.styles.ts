import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeadingTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  fontWeight: 500,
  textTransform: 'uppercase',
}));
