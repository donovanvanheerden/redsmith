import { Tooltip, Typography } from '@mui/material';
import React from 'react';

import { Root } from './connectionBlock.styles';

interface Props {
  active?: boolean;
  title: string;
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

const ConnectionBlock = ({
  active = false,
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

  return (
    <Tooltip title={title} placement={tooltipPlacement}>
      <Root active={active} onClick={onClick} onContextMenu={onRightClick}>
        {children ? children : <Typography>{label}</Typography>}
      </Root>
    </Tooltip>
  );
};

export default ConnectionBlock;
