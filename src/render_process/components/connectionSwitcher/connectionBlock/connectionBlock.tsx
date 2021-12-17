import composeClasses from '@mui/base/composeClasses';
import { Tooltip, Typography } from '@mui/material';
import { useThemeProps } from '@mui/system';
import clsx from 'clsx';
import React from 'react';

import { Root } from './connectionBlock.styles';
import { getRedConnectionButtonUtilityClass, RedConnectionButtonClasses } from './connectionBlockClasses';

interface Props {
  active?: boolean;
  title: string;
  className?: string;
  color?: 'primary' | 'secondary';
  tooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  children?: React.ReactNode;
  classes?: {
    root?: string;
  };
  onClick?: () => void;
  onRightClick?: (event: React.MouseEvent) => void;
}

const useUtilityClasses = ({ active, classes }: { active: boolean; classes: Partial<RedConnectionButtonClasses> }) => {
  const slots = {
    root: ['root', active && 'active'],
  };

  const composedClasses = composeClasses(slots, getRedConnectionButtonUtilityClass, classes);

  return composedClasses;
};

const ConnectionBlock = (compProps: Props) => {
  const props = useThemeProps({ props: compProps, name: 'RedConnectionButton' });

  const {
    active = false,
    color = 'primary',
    className,
    children,
    title,
    tooltipPlacement = 'right',
    onClick,
    onRightClick,
  } = props;

  const ownerState = {
    active: props.active,
    classes: props.classes,
  };

  let label = title
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  if (label.length === 1) label = title.substring(0, 3).toUpperCase();

  const classes = useUtilityClasses(ownerState);

  return (
    <Tooltip title={title} placement={tooltipPlacement}>
      <Root
        active={active}
        color={color}
        className={clsx(classes.root, className)}
        onClick={onClick}
        onContextMenu={onRightClick}
      >
        {children ? children : <Typography>{label}</Typography>}
      </Root>
    </Tooltip>
  );
};

export default ConnectionBlock;
