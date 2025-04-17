import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '../../redux/cartSlice';

// type Coffee = {
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
// };

export default function Home() {
  const [menu, setMenu] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('https://wpu-cafe.vercel.app/api/menu');
        setMenu(Array.isArray(res.data) ? res.data : res.data.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (coffee: CartItem) => {
    const cartItem = {
      ...coffee,
      id: coffee.id.toString(),
      quantity: 1,
      tableNumber: 0,
      notes: '',
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className='max-w-5xl mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold mb-4'>Menu La-Tansa Coffee</h1>
      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {menu?.map((coffee) => (
            <div
              key={coffee.id}
              className='bg-white p-4 rounded-xl shadow hover:shadow-lg transition overflow-hidden hover:scale-105'
            >
              <img
                src={coffee.image_url}
                alt={coffee.name}
                className='w-full h-40 object-cover rounded mb-2'
              />
              <h2 className='font-semibold text-lg'>{coffee.name}</h2>
              <p className='text-sm text-gray-600'>
                $ {coffee.price.toLocaleString()}
              </p>
              <button
                onClick={() => handleAddToCart(coffee)}
                className='mt-2 w-full bg-amber-600 text-white py-1 rounded hover:bg-amber-700 cursor-pointer transition'
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
