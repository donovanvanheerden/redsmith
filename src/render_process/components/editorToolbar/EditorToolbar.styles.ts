import { styled, Select, Toolbar, selectClasses } from '@mui/material';

export const ButtonToolbar = styled(Toolbar)(({ theme: { spacing } }) => ({
  minHeight: spacing(),
}));

export const LanguageSelector = styled(Select)(({ theme: { spacing } }) => ({
  marginLeft: spacing(),
  [`& .${selectClasses.select}`]: {
    padding: spacing(1, 4, 1, 1),
  },
}));
