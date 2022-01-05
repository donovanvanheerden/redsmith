import { alpha, styled, Select, Toolbar, selectClasses, iconButtonClasses, outlinedInputClasses } from '@mui/material';

export const ButtonToolbar = styled(Toolbar)(({ theme: { palette, spacing } }) => ({
  height: spacing(5),
  minHeight: 'unset !important',
  backgroundColor: palette.grey[800],
  margin: spacing(1),
  padding: `${spacing(0, 0, 0, 0)} !important`,
  borderRadius: spacing(2),
  [`& .${iconButtonClasses.root}`]: {
    height: spacing(5),
    padding: spacing(),
    color: alpha(palette.common.white, 0.4),
    borderRight: `2px solid ${palette.grey[700]}`,
    borderRadius: 0,
    [`&.${iconButtonClasses.disabled}`]: {
      color: alpha(palette.grey[900], 0.8),
    },
    [`&:first-of-type`]: {
      borderRadius: spacing(2, 0, 0, 2),
    },
  },
}));

export const LanguageSelector = styled(Select)(({ theme: { palette, spacing } }) => ({
  marginLeft: 'auto',
  borderRadius: spacing(0, 2, 2, 0),
  width: spacing(12),
  [`& .${selectClasses.select}`]: {
    padding: spacing(1, 4, 1, 1),
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    borderRadius: `${spacing(0, 2, 2, 0)} !important`,
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: 'none',
  },
}));
