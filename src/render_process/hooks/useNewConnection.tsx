import React from 'react';
import { createPortal } from 'react-dom';
import { NewConnection as NewConnectionModal } from '../components/shared';

interface NewConnectionHook {
  handleShow: () => Promise<void>;
  NewConnection: React.FC;
}

const useNewConnectionModal = (): NewConnectionHook => {
  const [open, setOpen] = React.useState(false);

  const resolver = React.useRef<(value: unknown) => void>();

  const handleClose = () => {
    resolver.current && resolver.current(false);

    setOpen(false);
  };

  const handleShow = (): Promise<void> => {
    setOpen(true);

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const Dialog = () => createPortal(<NewConnectionModal open={open} onClose={handleClose} />, document.body);

  const NewConnection = () => open && <Dialog />;

  return { handleShow, NewConnection };
};

export default useNewConnectionModal;
