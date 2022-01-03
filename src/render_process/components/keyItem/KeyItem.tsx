import { useThemeProps, unstable_composeClasses as composeClasses, ListItemText } from '@mui/material';
import React from 'react';
import { KeyRoot } from './KeyItem.styles';
import { getRedKeyItemUtilityClass, RedKeyItemClasses } from './KeyItemClasses';

const useUtilityClasses = ({ classes, selected }: Pick<Props, 'classes' | 'selected'>) => {
  const slots = {
    root: ['root', selected && 'selected'],
  };

  return composeClasses(slots, getRedKeyItemUtilityClass, classes);
};
interface Props {
  keyName: string;
  selected?: boolean;
  classes?: Partial<RedKeyItemClasses>;
  onClick?: () => void;
}

const KeyItem = (compProps: Props) => {
  const props = useThemeProps({ props: compProps, name: 'RedKeyItem' });

  const { keyName, onClick } = props;

  const classes = useUtilityClasses(props);

  return (
    <KeyRoot className={classes.root} onClick={onClick}>
      <ListItemText primary={keyName} />
    </KeyRoot>
  );
};
export default KeyItem;
