import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles(({ breakpoints, spacing, palette }: Theme) =>
  createStyles({
    root: {
      padding: spacing(3),
    },
  })
);

export default styles;
