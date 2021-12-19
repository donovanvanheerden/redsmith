import composeClasses from '@mui/base/composeClasses';
import { Tooltip, TooltipProps, Typography } from '@mui/material';
import { useThemeProps } from '@mui/system';
import clsx from 'clsx';
import React from 'react';

import { generateButtonText } from '../../../utils/string';

import { Root } from './connectionBlock.styles';
import { getRedConnectionButtonUtilityClass, RedConnectionButtonClasses } from './connectionBlockClasses';

type PropType<TObject, TProperty extends keyof TObject> = TObject[TProperty];

interface Props {
  active?: boolean;
  children?: React.ReactNode;
  classes?: {
    root?: string;
  };
  className?: string;
  color?: 'primary' | 'secondary';
  title: string;
  tooltipPlacement?: PropType<TooltipProps, 'placement'>;
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

  const label = generateButtonText(title);

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
