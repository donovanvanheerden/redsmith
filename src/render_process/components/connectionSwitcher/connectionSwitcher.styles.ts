import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme: { spacing } }) => ({
  height: '100vh',
  width: spacing(10),
  padding: spacing(),
  backgroundColor: '#333',
  display: 'flex',
  flexDirection: 'column',
}));

interface ConnectionBlockProps {
  active?: boolean;
}

export const ConnectionBlock = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<ConnectionBlockProps>(({ active, theme: { spacing, palette } }) => ({
  height: spacing(7),
  width: spacing(7),
  backgroundColor: '#444',
  borderRadius: spacing(),
  color: '#f2f2f2',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '* 200ms ease-in-out',
  cursor: 'pointer',
  ...(active && {
    border: `2px solid ${palette.primary.light}`,
    backgroundColor: palette.primary.dark,
    color: palette.primary.contrastText,
    fontWeight: 'bold',
  }),
  '&:not(:first-child)': {
    marginTop: spacing(),
  },
  '&:hover': {
    backgroundColor: active ? palette.primary.light : '#555',
  },
}));
