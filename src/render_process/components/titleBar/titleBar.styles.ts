import { alpha, IconButton, styled, Typography } from '@mui/material';

export const Root = styled('div')(({ theme: { palette, spacing } }) => ({
  height: spacing(4),
  position: 'relative',
  backgroundColor: palette.grey[900],
}));

export const Title = styled(Typography)(({ theme: { palette, spacing } }) => ({
  color: alpha(palette.common.white, 0.8),
  fontWeight: 500,
  padding: spacing(0.75, 1.5),
}));

export const WindowControls = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 46px)',
  height: '100%',
  top: 0,
  right: 0,
  position: 'absolute',
}));

export const WindowButton = styled(IconButton)(({ theme: { palette, spacing } }) => ({
  borderRadius: 0,
  padding: spacing(0.75),
  color: alpha(palette.common.white, 0.4),
  [`&:hover:last-of-type`]: {
    backgroundColor: palette.error.main,
  },
  [`&:hover`]: {
    backgroundColor: alpha(palette.common.white, 0.2),
    color: alpha(palette.common.white, 0.8),
  },
  '& svg': {
    width: '0.8em',
    height: '0.8em',
  },
}));
