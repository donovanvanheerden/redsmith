import * as React from 'react';
import useStyles from './header.styles';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

interface Props {
  className?: string;
  title: string;
}

const header = ({ className, title }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Typography className={clsx(classes.root, className)} variant="h4">
      {title}
    </Typography>
  );
};

export default header;
