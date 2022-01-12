import React from 'react';

import { Root, Title, WindowButton, WindowControls } from './titleBar.styles';

import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useIpc } from '../../hooks/useFromDi';

const TitleBar = () => {
  const ipc = useIpc();

  const handleClose = () => ipc.close();
  const handleMaximize = () => ipc.maximize();
  const handleMinimize = () => ipc.minimize();

  return (
    <Root id="titlebar">
      <Title>Redsmith</Title>
      <WindowControls id="window-controls">
        <WindowButton disableRipple onClick={handleMinimize}>
          <HorizontalRuleOutlinedIcon />
        </WindowButton>
        <WindowButton disableRipple onClick={handleMaximize}>
          <SquareOutlinedIcon />
        </WindowButton>
        <WindowButton disableRipple onClick={handleClose}>
          <CloseIcon />
        </WindowButton>
      </WindowControls>
    </Root>
  );
};

export default TitleBar;
