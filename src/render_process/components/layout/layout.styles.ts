import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      //width: `calc(100% - ${drawerWidth}px)`,
    },
  })
);
