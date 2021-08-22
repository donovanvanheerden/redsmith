import { createStyles, makeStyles, Theme } from '@material-ui/core';

const drawerWidth = 240;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      //   flexGrow: 1,
      //   padding: theme.spacing(3),
      width: `calc(100% - ${drawerWidth}px)`,
    },
  })
);
