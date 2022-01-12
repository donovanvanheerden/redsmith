import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export interface RedDbItemClasses {
  root: string;
  selected: string;
  primary: string;
  secondary: string;
}

export type RedDbItemClassKey = keyof RedDbItemClasses;

export const getRedDbItemUtilityClass = (slot: string): string => {
  return generateUtilityClass('RedDbItem', slot);
};

const redDbItemClasses: RedDbItemClasses = generateUtilityClasses('RedDbItem', [
  'root',
  'selected',
  'primary',
  'secondary',
]);

export default redDbItemClasses;
