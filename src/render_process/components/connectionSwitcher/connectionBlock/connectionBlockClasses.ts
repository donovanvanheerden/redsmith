import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export interface RedConnectionButtonClasses {
  root: string;
  active: string;
}

export type RedConnectionButtonClassKey = keyof RedConnectionButtonClasses;

export const getRedConnectionButtonUtilityClass = (slot: string): string => {
  return generateUtilityClass('RedConnectionButton', slot);
};

const redConnectionButtonClasses: RedConnectionButtonClasses = generateUtilityClasses('RedConnectionButton', [
  'root',
  'active',
]);

export default redConnectionButtonClasses;
