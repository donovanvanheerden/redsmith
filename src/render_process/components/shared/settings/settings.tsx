import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { settingsActions } from '../../../store/reducers/settings-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Settings = ({ open, onClose }: Props) => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const [localSettings, setSettings] = React.useState<typeof settings>(settings);

  const handleCheckboxChange = (key: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setSettings((s) => ({ ...s, [key]: event.target.checked }));

  const handleSave = () => {
    dispatch(settingsActions.saveSettings(localSettings));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={localSettings.autoFormat} onChange={handleCheckboxChange('autoFormat')} />}
              label={
                <ListItemText primary="Auto Format" secondary="Automatically format the value when language changes" />
              }
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
