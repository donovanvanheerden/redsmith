import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles(({ breakpoints, spacing, palette }: Theme) =>
  createStyles({
    root: {
      minWidth: spacing(28),
      height: '100vh',
      borderRight: `1px solid ${palette.grey[300]}`,
    },
    keys: {
      overflow: 'hidden',
    },
  })
);

export default styles;
