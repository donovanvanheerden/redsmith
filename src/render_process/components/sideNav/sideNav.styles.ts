import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiPaper-root': {
    width: '100%',
    position: 'relative',
  },
}));

export const Toolbar = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
}));
