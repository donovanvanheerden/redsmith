import React from 'react';
import { createPortal } from 'react-dom';
import { ExpireKey as ExpireKeyModal } from '../components/shared';

interface IExpireKeyModal {
  title: string;
  open: boolean;
}

const defaultOptions: IExpireKeyModal = {
  title: 'Set Expiry',
  open: false,
};

interface ExpireKeyHook {
  handleShow: (title?: string) => Promise<number>;
  ExpireKey: React.FC;
}

const useExpireKeyModal = (): ExpireKeyHook => {
  const [expireKey, setExpireKey] = React.useState<IExpireKeyModal>({
    ...defaultOptions,
  });

  const resolver = React.useRef<(value: unknown) => void>();

  const handleConfirm = (newExpiry: number) => {
    resolver.current && resolver.current(newExpiry);

    setExpireKey(defaultOptions);
  };

  const handleClose = () => {
    resolver.current && resolver.current(false);

    setExpireKey(defaultOptions);
  };

  const handleShow = (title = 'Set Expiry'): Promise<number> => {
    setExpireKey({ open: true, title });

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const Dialog = () =>
    createPortal(
      <ExpireKeyModal
        {...expireKey}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />,
      document.body
    );

  const ExpireKey = () => expireKey.open && <Dialog />;

  return { handleShow, ExpireKey };
};

export default useExpireKeyModal;
