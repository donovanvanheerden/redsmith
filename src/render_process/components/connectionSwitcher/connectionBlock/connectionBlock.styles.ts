import { styled } from '@mui/material/styles';

interface Props {
  active?: boolean;
}

export const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<Props>(({ active, theme: { spacing, palette } }) => ({
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
