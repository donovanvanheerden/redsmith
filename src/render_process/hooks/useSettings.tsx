import React from 'react';
import { createPortal } from 'react-dom';
import { Settings as SettingsModal } from '../components/shared';

interface SettingsHook {
  handleOpen: () => void;
  Settings: React.FC;
}

const useSettingsModal = (): SettingsHook => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleShow = (): void => {
    setOpen(true);
  };

  const Dialog = () => createPortal(<SettingsModal open={open} onClose={handleClose} />, document.body);

  const Settings = () => open && <Dialog />;

  return { handleOpen: handleShow, Settings };
};

export default useSettingsModal;
