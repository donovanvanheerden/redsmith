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
    <Root>
      <Title>Redsmith</Title>
      <WindowControls>
        <WindowButton onClick={handleMinimize}>
          <HorizontalRuleOutlinedIcon />
        </WindowButton>
        <WindowButton onClick={handleMaximize}>
          <SquareOutlinedIcon />
        </WindowButton>
        <WindowButton color="error" onClick={handleClose}>
          <CloseIcon />
        </WindowButton>
      </WindowControls>
    </Root>
  );
};

export default TitleBar;
