import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart } from '../../redux/cartSlice';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
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
              <div>
                <h2 className='font-semibold'>{item.name}</h2>
                <p className='text-sm text-gray-500'>
                  {item.quantity} x Rp {item.price.toLocaleString()}
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <p className='font-bold text-amber-700'>
                  Rp {(item.quantity * item.price).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className='text-sm text-red-500 hover:underline cursor-pointer'
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          <div className='text-right font-bold text-lg text-amber-700'>
            Total: Rp {totalPrice.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
