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

const ConnectionBlock = ({
  active = false,
  className,
  children,
  title,
  tooltipPlacement = 'right',
  onClick,
  onRightClick,
}: Props) => {
  let label = title
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  if (label.length === 1) label = title.substr(0, 3).toUpperCase();

  const ownerState = {
    active,
    classes: {},
  };

  const props = useThemeProps({ props: { active, color: undefined }, name: 'RedConnectionButton' });

  const classes = useUtilityClasses(ownerState);

  return (
    <Tooltip title={title} placement={tooltipPlacement}>
      <Root
        active={props.active}
        color={props.color}
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
