import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  removeFromCart,
  onIncrement,
  onDecrement,
  setSelectedItemId,
} from '../../redux/cartSlice';
import Checkout from '../Checkout/Checkout';
import { useState } from 'react';
import { openDialog } from '../../redux/dialogSlice';
import DialogRoot from './../../components/DialogRoot';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const handleDecrement = (id: string) => {
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);
    if (itemIndex === -1) {
      console.error('Item not found in cart');
    } else {
      const item = cartItems[itemIndex];
      if (item.quantity > 1) {
        dispatch(onDecrement(id));
      } else {
        dispatch(setSelectedItemId(id));
        setIsDialogOpen(true);
        dispatch(openDialog('remove-item'));
      }
    }
  };

  const handleIncrement = (id: string) => {
    dispatch(onIncrement(id));
  };

  return (
    <>
      <div className='max-w-3xl mx-auto px-4 py-6'>
        <h1 className='text-2xl font-bold mb-4'>Keranjang Belanja</h1>
        {cartItems.length === 0 ? (
          <p>Keranjang masih kosong.</p>
        ) : (
          <div className='space-y-4'>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between bg-white p-4 rounded shadow'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className='w-16 h-16 object-cover rounded'
                  />
                  <div>
                    <h2 className='font-semibold'>{item.name}</h2>
                    <p className='text-sm text-gray-500'>
                      {item.quantity} x $ {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <div className='flex items-right gap-7'>
                    <p className='font-bold text-amber-700'>
                      $ {(item.quantity * item.price).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className='text-sm text-red-500 hover:underline cursor-pointer'
                    >
                      Hapus
                    </button>
                  </div>

                  <div className='flex items-between gap-2 mt-2'>
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className='w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600'
                    >
                      -
                    </button>
                    <span className='px-2'>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className='w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className='text-right font-bold text-lg text-amber-700'>
              Total: $ {totalPrice.toLocaleString()}
            </div>
          </div>
        )}
      </div>
      {isDialogOpen && <DialogRoot />}
      <Checkout />
    </>
  );
}
