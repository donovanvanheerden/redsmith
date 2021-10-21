import React from 'react';
import { createPortal } from 'react-dom';
import { RenameKey as RenameKeyModal } from '../components/shared';

interface IRenameKeyModal {
  title: string;
  oldName: string;
  open: boolean;
}

const defaultOptions: IRenameKeyModal = {
  title: 'Rename',
  oldName: null,
  open: false,
};

interface RenameKeyHook {
  handleShow: (oldKey: string, title?: string) => Promise<string>;
  RenameKey: React.FC;
}

const useRenameKeyModal = (): RenameKeyHook => {
  const [renameKey, setRenameKey] = React.useState<IRenameKeyModal>({
    ...defaultOptions,
  });

  const resolver = React.useRef<(value: unknown) => void>();

  const handleConfirm = (newName: string) => {
    resolver.current && resolver.current(newName);

    setRenameKey(defaultOptions);
  };

  const handleClose = () => {
    resolver.current && resolver.current(false);

    setRenameKey(defaultOptions);
  };

  const handleShow = (
    oldName: string,
    title = 'Rename Key'
  ): Promise<string> => {
    setRenameKey({ open: true, oldName, title });

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const Dialog = () =>
    createPortal(
      <RenameKeyModal
        {...renameKey}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />,
      document.body
    );

  const RenameKey = () => renameKey.open && <Dialog />;

  return { handleShow, RenameKey };
};

export default useRenameKeyModal;
