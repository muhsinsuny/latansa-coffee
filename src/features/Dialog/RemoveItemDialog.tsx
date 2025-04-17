import {
  removeFromCart,
  CartItem,
  setSelectedItemId,
} from '../../redux/cartSlice';
import { useAppDispatch } from '../../redux/hook';

// components/RemoveItemDialog.tsx

type Props = {
  onClose: () => void;
  item: CartItem;
};

const RemoveItemDialog: React.FC<Props> = ({ onClose, item: { id } }) => {
  const dispatch = useAppDispatch(); // Assuming you have a custom hook for dispatch
  const handleRemove = () => {
    dispatch(setSelectedItemId(id));
    dispatch(removeFromCart(id));
    onClose();
  };
  return (
    <>
      <h3 className='text-lg font-semibold mb-2'>Hapus Item</h3>
      <p>Apakah kamu yakin ingin menghapus item ini?</p>
      <div className='mt-4 flex justify-end gap-2'>
        <button
          className='px-4 py-2 bg-gray-200 rounded cursor-pointer'
          onClick={onClose}
        >
          Batal
        </button>
        <button
          className='px-4 py-2 bg-red-600 text-white rounded cursor-pointer'
          onClick={handleRemove}
        >
          Hapus
        </button>
      </div>
    </>
  );
};

export default RemoveItemDialog;
