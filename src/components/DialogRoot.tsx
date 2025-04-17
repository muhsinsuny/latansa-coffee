// components/DialogRoot.tsx

import ConfirmLogoutDialog from '../features/Dialog/ConfirmLogoutDialog';
import DialogOverlay from '../features/Dialog/DialogOverlay';
import RemoveItemDialog from '../features/Dialog/RemoveItemDialog';
import { closeDialog } from '../redux/dialogSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { RootState } from '../redux/store';
import { createPortal } from 'react-dom';

const DialogRoot = () => {
  const dialogType = useAppSelector((state: RootState) => state.dialog.type);
  const selectedItemId = useAppSelector(
    (state: RootState) => state.cart.selectedItemId
  );
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleClose = () => dispatch(closeDialog());
  const renderContent = () => {
    switch (dialogType) {
      case 'remove-item': {
        const selectedItem = cartItems.find(
          (item) => item.id === selectedItemId
        );
        return selectedItem ? (
          <RemoveItemDialog onClose={handleClose} item={selectedItem} />
        ) : null;
      }
      case 'confirm-logout':
        return <ConfirmLogoutDialog onClose={handleClose} />;
      default:
        return null;
    }
  };

  return createPortal(
    <DialogOverlay isOpen={dialogType !== null} onClose={handleClose}>
      {renderContent()}
    </DialogOverlay>,
    document.getElementById('portal') as HTMLElement
  );
};

export default DialogRoot;
