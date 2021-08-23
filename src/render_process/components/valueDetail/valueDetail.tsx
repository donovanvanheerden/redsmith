import * as React from 'react';
import useStyles from './valueDetail.styles';
import clsx from 'clsx';
import { Grid, IconButton, Toolbar, Tooltip } from '@material-ui/core';

import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Header } from '../header';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const ValueDetail = (props: Props): JSX.Element => {
  const classes = useStyles();

  const hasKey = false;

  return (
    <Grid xs={6} className={clsx(classes.root, props.className)} item>
      <Header title="Value Detail" className={classes.heading} />
      <Toolbar className={classes.buttonToolbar}>
        <Tooltip title="Save">
          <span>
            <IconButton disabled={!hasKey}>
              <SaveOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Refresh">
          <span>
            <IconButton disabled={!hasKey}>
              <CachedOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Set Expiration">
          <span>
            <IconButton disabled={!hasKey}>
              <ScheduleOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Rename Key">
          <span>
            <IconButton disabled={!hasKey}>
              <EditOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete">
          <span>
            <IconButton disabled={!hasKey}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
    </Grid>
  );
};

export default ValueDetail;
