import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import { settingsActions } from '../../../store/reducers/settings-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useIpc } from '../../../hooks/useFromDi';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Settings = ({ open, onClose }: Props) => {
  const ipc = useIpc();

  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const [localSettings, setSettings] = React.useState<typeof settings>(settings);

  const handleCheckboxChange = (key: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setSettings((s) => ({ ...s, [key]: event.target.checked }));

  const handleRadioChange = (key: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setSettings((s) => ({ ...s, [key]: event.target.value }));

  const handleSave = async () => {
    dispatch(settingsActions.saveSettings(localSettings));
    void ipc.saveSettings(localSettings);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <FormControl>
              <FormLabel>
                <ListItemText primary="Auto Format" />
              </FormLabel>
              <FormControlLabel
                control={<Checkbox checked={localSettings.autoFormat} onChange={handleCheckboxChange('autoFormat')} />}
                label={<ListItemText secondary="Automatically format the value when language changes" />}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl component="fieldset">
              <FormLabel>
                <ListItemText
                  primary="Preferred Format"
                  secondary="Default the language dropdown to a preferred format, useful if string values are of some other format"
                />
              </FormLabel>
              <RadioGroup
                row
                onChange={handleRadioChange('preferredLanguage')}
                defaultValue={settings.preferredLanguage}
              >
                <FormControlLabel control={<Radio />} label="Text" value="text" />
                <FormControlLabel control={<Radio />} label="JSON" value="json" />
                <FormControlLabel control={<Radio />} label="XML" value="xml" />
              </RadioGroup>
            </FormControl>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
