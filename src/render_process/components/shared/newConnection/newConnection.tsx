import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Alert } from '../';

import { useIpc } from '../../../hooks/useFromDi';
import { redisActions } from '../../../store/reducers/redis-slice';
import { connectionActions } from '../../../store/reducers/connection-slice';
import { Connection } from '../../../../core/interfaces';
import { useAppDispatch } from '../../../hooks';

import { RedTextField } from './newConnection.styles';

interface AlertMessage {
  open: boolean;
  message: string;
  hideDuration: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const NewConnection = ({ open, onClose }: Props) => {
  const [alert, setAlert] = React.useState<AlertMessage>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ipc = useIpc();

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const errors: Record<string, string> = {};

    formData.forEach((fieldValue, fieldKey) => {
      if (fieldValue === '' && fieldKey !== 'password') {
        errors[fieldKey] = 'Please enter value.';
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);

      return;
    }

    try {
      const connection: Connection = {
        host: formData.get('host').toString(),
        name: formData.get('name').toString(),
        port: parseInt(formData.get('port').toString()),
        password: formData.get('password').toString(),
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

      setAlert(alert);
    }

    onClose();
  };

  return (
    <React.Fragment>
      {alert && (
        <Alert open={alert.open} message={alert.message} hideDuration={alert.hideDuration} onClose={setAlert} />
      )}
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs">
        <DialogTitle id="form-dialog-title">New Connection</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <RedTextField
              name="name"
              variant="filled"
              label="Name"
              size="small"
              error={Boolean(errors['name'])}
              helperText={errors['name']}
              fullWidth
              placeholder="Development Server"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 1 }}
            />
            <span style={{ display: 'flex', marginBottom: 8 }}>
              <RedTextField
                name="host"
                variant="filled"
                label="Host"
                size="small"
                placeholder="127.0.0.1"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors['host'])}
                helperText={errors['host']}
              />
              <RedTextField
                name="port"
                variant="filled"
                label="Port"
                size="small"
                type="number"
                placeholder="6379"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors['port'])}
                helperText={errors['port']}
                sx={{ marginLeft: 0.5, width: 96 }}
              />
            </span>
            <RedTextField
              id="Password"
              name="password"
              variant="filled"
              label="Password"
              size="small"
              type="password"
              error={Boolean(errors['password'])}
              helperText={errors['password']}
              fullWidth
            />
            <br />
            {/* <TextField id="Namespace" name="namespace" label="Namespace" /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default NewConnection;
