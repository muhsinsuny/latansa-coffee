import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: string;
  customer_name: string;
  table_number: number;
  total: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://wpu-cafe.vercel.app/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const orders = Array.isArray(res.data.data) ? res.data.data : [];

        setOrders(orders);
        console.log('orders dari API', orders);
        const revenue = orders.reduce(
          (sum: number, order: Order) => sum + order.total,
          0
        );
        setTotalRevenue(revenue);
      } catch (error) {
        console.error('Gagal mengambil data order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdatesStatus = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login terlebih dahulu.');
      return;
    }
    try {
      await axios.put(
        `https://wpu-cafe.vercel.app/api/orders/${id}`,
        { status: 'COMPLETED' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: 'COMPLETED' } : order
        )
      );
    } catch (error) {
      console.error('Gagal memperbarui status order:', error);
      alert('Gagal memperbarui status order. Silakan coba lagi.');
    }
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard Admin</h1>
      {loading ? (
        <p className='text-gray-600'>Memuat data...</p>
      ) : (
        <>
          <div className='bg-white rounded shadow p-4 mb-6'>
            <h2 className='text-lg font-semibold'>
              Total Pendapatan Hari Ini:
            </h2>
            <p className='text-2xl text-green-600 font-bold'>
              $ {totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead className='bg-amber-100 text-amber-800'>
                <tr>
                  <th className='px-4 py-2'>Nama</th>
                  <th className='px-4 py-2'>Nomor Meja</th>
                  <th className='px-4 py-2'>Total</th>
                  <th className='px-4 py-2'>Status</th>
                  <th className='px-4 py-2'>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className='border-b'>
                    <td className='px-4 py-2'>{order.customer_name}</td>
                    <td className='px-4 py-2 whitespace-nowrap'>
                      {order.table_number}
                    </td>
                    <td className='px-4 py-2'>
                      $ {order.total.toLocaleString()}
                    </td>
                    <td className='px-4 py-2 capitalize'>
                      {order.status === 'PROCESSING' && (
                        <button
                          className='bg-green-500 text-white px-3 py-1 mt-2 cursor-pointer rounded hover:bg-green-600'
                          onClick={() => handleUpdatesStatus(order.id)}
                        >
                          Tandai selesai
                        </button>
                      )}
                      {order.status}
                    </td>
                    <td className='px-4 py-2'>
                      {new Date(order.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
