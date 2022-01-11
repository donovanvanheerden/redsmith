import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export interface RedKeyItemClasses {
  root: string;
  selected: string;
}

export type RedKeyItemClassKey = keyof RedKeyItemClasses;

export const getRedKeyItemUtilityClass = (slot: string): string => {
  return generateUtilityClass('RedKeyItem', slot);
};

const redKeyItemClasses: RedKeyItemClasses = generateUtilityClasses('RedKeyItem', ['root', 'selected']);

export default redKeyItemClasses;
