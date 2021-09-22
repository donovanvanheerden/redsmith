import React from 'react';
import { createPortal } from 'react-dom';
import { Confirm as ConfirmModal } from '../components/shared';

interface IConfirmModal {
  title: string;
  message: string;
  open: boolean;
}

const defaultOptions: IConfirmModal = {
  message: null,
  open: false,
  title: 'Confirm',
};

interface ConfirmHook {
  handleShow: (message: string, title?: string) => Promise<boolean>;
  Confirm: React.FC;
}

const useConfirmModal = (): ConfirmHook => {
  const [confirm, setConfirm] = React.useState<IConfirmModal>({
    ...defaultOptions,
  });

  const resolver = React.useRef<(value: unknown) => void>();

  const handleConfirm = () => {
    resolver.current && resolver.current(true);

    setConfirm(defaultOptions);
  };

  const handleClose = () => {
    resolver.current && resolver.current(false);

    setConfirm(defaultOptions);
  };

  const handleShow = (message: string, title = 'Confirm'): Promise<boolean> => {
    setConfirm({ open: true, message, title });

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const Dialog = () =>
    createPortal(
      <ConfirmModal
        {...confirm}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />,
      document.body
    );

  const Confirm = () => confirm.open && <Dialog />;

  return { handleShow, Confirm };
};

export default useConfirmModal;
