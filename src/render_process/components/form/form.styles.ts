import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles(({ breakpoints, spacing, palette }: Theme) =>
  createStyles({
    root: {
      padding: spacing(3),
    },
  })
);

export default styles;
