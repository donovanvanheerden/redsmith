import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles(({ breakpoints, spacing, palette }: Theme) =>
  createStyles({
    root: {
      minWidth: spacing(28),
      height: '100vh',
    },
    heading: {
      paddingBottom: spacing(),
    },
    buttonToolbar: {
      minHeight: spacing(),
    },
    editor: {
      height: '100%',
      width: '100%',
    },
  })
);

export default styles;
