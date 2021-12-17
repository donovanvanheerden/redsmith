import { alpha, buttonBaseClasses, iconButtonClasses, Palette, styled, typographyClasses } from '@mui/material';
import redConnectionButtonClasses from './connectionBlockClasses';

interface Props {
  active?: boolean;
  color?: keyof Pick<Palette, 'primary' | 'secondary'>;
}

export const Root = styled('div', {
  name: 'RedConnectionButton',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === 'primary' && styles.primary,
    props.color === 'secondary' && styles.secondary,
  ],
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'active' && prop !== 'sx',
})<Props>(({ theme: { palette, spacing }, color }) => ({
  backgroundColor: alpha(palette.grey[700], 0.4),
  borderRadius: '50%',
  color: palette[color].main,
  height: spacing(6),
  width: spacing(6),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: `2px solid transparent`,
  transition: 'all 200ms ease-in-out',
  [`& .${typographyClasses.root}`]: {
    color: palette[color].contrastText,
    fontWeight: 600,
  },
  '&:not(:first-child)': {
    marginTop: spacing(),
  },
  '&:hover': {
    backgroundColor: alpha(palette.grey[700], 0.6),
  },
  [`&:hover button.${buttonBaseClasses.root}.${iconButtonClasses.root}`]: {
    backgroundColor: 'transparent',
  },
  [`&.${redConnectionButtonClasses.active}`]: {
    border: `2px solid ${palette[color].main}`,
    '&:hover': {
      border: `2px solid ${palette[color].light}`,
    },
  },
}));
