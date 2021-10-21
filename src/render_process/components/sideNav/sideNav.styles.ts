import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const drawerWidth = 240;

export default makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // padding: theme.spacing(0, 1),
      flexDirection: 'column',
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // width: '100%',
      // position: 'relative',
      // overflowX: 'hidden',
      // width: theme.spacing(8) + 1,
    },
  })
);
