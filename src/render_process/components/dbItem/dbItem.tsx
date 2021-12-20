import React from 'react';
import { ListItemText, unstable_composeClasses as composeClasses, useThemeProps } from '@mui/material';
import { DbInfo } from '../../../core/interfaces';
import { getRedDbItemUtilityClass, RedDbItemClasses } from './dbItemClasses';
import { Root } from './dbItem.styles';
import clsx from 'clsx';

const useUtilityClasses = ({ classes, color, selected }: Pick<Props, 'classes' | 'color' | 'selected'>) => {
  const slots = {
    root: ['root', selected && 'selected', color],
  };

  return composeClasses(slots, getRedDbItemUtilityClass, classes);
};

interface Props extends DbInfo {
  selected?: boolean;
  onClick?: () => void;
  classes?: Partial<RedDbItemClasses>;
  color?: 'primary' | 'secondary';
}

const DbItem = (compProps: Props) => {
  const props = useThemeProps({ props: compProps, name: 'RedDbItem' });
  const { color = 'primary', name, keys = 0, onClick } = props;

  const classes = useUtilityClasses(props);

  return (
    <Root key={name} color={color} className={clsx(classes.root)} onClick={onClick}>
      <ListItemText primary={name} secondary={`${keys} keys`} />
    </Root>
  );
};

export default DbItem;
