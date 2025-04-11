import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || cart.length === 0) return;

    setLoading(true);

    try {
      await axios.post('https://wpu-cafe.vercel.app/api/orders', {
        name,
        items: cart.map((item) => `${item.name} x${item.quantity}`).join(', '),
        total,
      });
      dispatch(clearCart());
      navigate('/');
      alert('Pesanan berhasil dikirim!');
    } catch (error) {
      console.error('Gagal melakukan checkout:', error);
      alert('Checkout gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow rounded mt-6'>
      <h1 className='text-xl font-bold mb-4'>Checkout</h1>
      <form onSubmit={handleCheckout} className='space-y-4'>
        <div>
          <label className='block text-sm mb-1'>Nama Pembeli</label>
          <input
            type='text'
            className='w-full border rounded p-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <h2 className='font-semibold'>Pesanan Anda:</h2>
          <ul className='text-sm text-gray-700 list-disc list-inside'>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className='font-bold text-lg'>
          Total: Rp {total.toLocaleString()}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700'
        >
          {loading ? 'Memproses...' : 'Kirim Pesanan'}
        </button>
      </form>
    </div>
  );
}
