import { Tooltip, TooltipProps, Typography, unstable_composeClasses as composeClasses } from '@mui/material';
import { useThemeProps } from '@mui/system';
import clsx from 'clsx';
import React from 'react';

import { generateButtonText } from '../../utils/string';

import { Root } from './connectionButton.styles';
import { getRedConnectionButtonUtilityClass, RedConnectionButtonClasses } from './connectionButtonClasses';

type PropType<TObject, TProperty extends keyof TObject> = TObject[TProperty];

const useUtilityClasses = ({ active, classes }: { active: boolean; classes: Partial<RedConnectionButtonClasses> }) => {
  const slots = {
    root: ['root', active && 'active'],
  };

  const composedClasses = composeClasses(slots, getRedConnectionButtonUtilityClass, classes);

  return composedClasses;
};

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

const ConnectionButton = (compProps: Props) => {
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

  const label = generateButtonText(title);

  const ownerState = {
    active: props.active,
    classes: props.classes,
  };

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

export default ConnectionButton;
