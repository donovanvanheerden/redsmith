import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export interface RedDbSelectorClasses {
  root: string;
  title: string;
  list: string;
}

export type RedDbSelectorClassKey = keyof RedDbSelectorClasses;

export const getRedDbSelectorUtilityClass = (slot: string): string => {
  return generateUtilityClass('RedDbSelector', slot);
};

const redDbSelectorClasses: RedDbSelectorClasses = generateUtilityClasses('RedDbSelector', ['root', 'title', 'list']);

export default redDbSelectorClasses;
