import React from 'react';
import { createPortal } from 'react-dom';
import { Connection } from '../../core/interfaces';
import { NewConnection as NewConnectionModal } from '../components/shared';

interface NewConnectionHook {
  handleEdit: (conn: Connection) => Promise<void>;
  handleShow: () => Promise<void>;
  NewConnection: React.FC;
}

const useNewConnectionModal = (): NewConnectionHook => {
  const [connection, setConnection] = React.useState<Connection>(undefined);
  const [open, setOpen] = React.useState(false);

  const resolver = React.useRef<(value: unknown) => void>();

  const handleClose = () => {
    resolver.current && resolver.current(false);

    setOpen(false);
    setConnection(undefined);
  };

  const handleEdit = (connection: Connection): Promise<void> => {
    setConnection(connection);
    setOpen(true);

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleShow = (): Promise<void> => {
    setOpen(true);

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const Dialog = () =>
    createPortal(<NewConnectionModal connection={connection} open={open} onClose={handleClose} />, document.body);

  const NewConnection = () => open && <Dialog />;

  return { handleEdit, handleShow, NewConnection };
};

export default useNewConnectionModal;
