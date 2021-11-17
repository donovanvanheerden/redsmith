import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Alert } from '../shared';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useIpc } from '../../hooks/useFromDi';
import { formActions } from '../../store/reducers/form-slice';
import { redisActions } from '../../store/reducers/redis-slice';
import { connectionActions } from '../../store/reducers/connection-slice';
import { Connection } from '../../../core/interfaces';

interface FormState {
  showConnForm: boolean;
}

interface AlertMessage {
  open: boolean;
  message: string;
  hideDuration: number;
}

export default function ConnectionForm(): JSX.Element {
  const [alertMsg, setalertMsg] = React.useState<AlertMessage>(null);
  const [errorMsgDict, seterrorMsgDict] = useState<Record<string, string>>({});

  const { showConnForm } = useSelector<RootState, FormState>((state) => ({
    showConnForm: state.form.formOpen,
  }));

  const dispatch = useDispatch();
  const ipc = useIpc();

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fieldDict: Record<string, string> = {};

    formData.forEach((fieldValue, fieldKey) => {
      if (fieldValue === '' && fieldKey !== 'ConnPassword') {
        fieldDict[fieldKey] = 'Please enter value.';
      }
    });

    if (Object.keys(fieldDict).length > 0) {
      seterrorMsgDict(fieldDict);
      return;
    }

    try {
      const connection: Connection = {
        host: formData.get('ConnAddress').toString(),
        name: formData.get('ConnName').toString(),
        port: parseInt(formData.get('ConnPort').toString()),
        password: formData.get('ConnPassword').toString(),
      };

      const response = await ipc.connect(connection);

      dispatch(connectionActions.addConnection(connection));
      dispatch(redisActions.setOnConnected(response));
    } catch (ex) {
      console.log(ex);

      const alert: AlertMessage = {
        open: true,
        message: 'An error has occurred: ' + ex.message,
        hideDuration: 6000,
      };

      setalertMsg(alert);
    }

    handleClose();
  };

  const handleClose = () => {
    dispatch(formActions.showForm({ formOpen: false }));
  };

  return (
    <React.Fragment>
      {alertMsg && (
        <Alert
          open={alertMsg.open}
          message={alertMsg.message}
          hideDuration={alertMsg.hideDuration}
          onClose={setalertMsg}
        />
      )}
      <Dialog
        open={showConnForm}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">New Connection</DialogTitle>
        {/* <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs> */}
        <form onSubmit={formSubmitHandler}>
          <DialogContent>
            <TextField
              id="Name"
              name="ConnName"
              variant="filled"
              label="Name"
              error={Boolean(errorMsgDict['ConnName'])}
              helperText={errorMsgDict['ConnName']}
              defaultValue="localhots"
            />
            <br />
            <TextField
              id="Address"
              name="ConnAddress"
              variant="filled"
              label="Host"
              error={Boolean(errorMsgDict['ConnAddress'])}
              helperText={errorMsgDict['ConnAddress']}
              defaultValue="localhost"
            />
            <TextField
              id="Port"
              name="ConnPort"
              variant="filled"
              label="Port"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errorMsgDict['ConnPort'])}
              helperText={errorMsgDict['ConnPort']}
              defaultValue="6379"
            />
            <br />
            <TextField
              id="Password"
              name="ConnPassword"
              variant="filled"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errorMsgDict['ConnPassword'])}
              helperText={errorMsgDict['ConnPassword']}
            />
            <br />
            <TextField id="Namespace" label="Namespace" />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Add
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
