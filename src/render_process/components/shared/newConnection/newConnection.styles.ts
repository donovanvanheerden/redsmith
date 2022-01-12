import { alpha, styled, TextField, inputLabelClasses, filledInputClasses } from '@mui/material';

export const RedTextField = styled(TextField, {
  name: 'RedTextField',
  slot: 'Root',
})(({ theme: { palette } }) => ({
  [`.${inputLabelClasses.root}`]: {
    color: alpha(palette.common.white, 0.4),
    [`&.${inputLabelClasses.focused}`]: {
      color: palette.common.white,
    },
  },
  [`.${filledInputClasses.root}`]: {
    color: alpha(palette.common.white, 0.8),
  },
}));
