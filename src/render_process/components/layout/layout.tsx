import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";

import { KeyList } from "../keyList";
import { SideNav } from "../sideNav";
import { ValueDetail } from "../valueDetail";

import useStyles from "./layout.styles";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../form";

import { formActions } from '../../store/reducers/form-slice';

interface FormState {
  showConnForm: boolean;
}

const Layout = (): JSX.Element => {
  const classes = useStyles();

  const { showConnForm } = useSelector<RootState, FormState>((state) => ({
    showConnForm: state.form.showConnectionForm,
  }));

  return (
    <Fragment>
      {showConnForm && <Form />}
      <div className={classes.root}>
        <SideNav />
        <Grid className={classes.content} container>
          <KeyList />
          <ValueDetail />
        </Grid>
      </div>
    </Fragment>
  );
};

export default Layout;
