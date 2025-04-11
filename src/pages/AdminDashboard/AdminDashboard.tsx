import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  name: string;
  items: string;
  total: number;
  status: string;
  createdAt: string;
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
        setOrders(res.data);
        const revenue = res.data.reduce(
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
              Rp {totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead className='bg-amber-100 text-amber-800'>
                <tr>
                  <th className='px-4 py-2'>Nama</th>
                  <th className='px-4 py-2'>Pesanan</th>
                  <th className='px-4 py-2'>Total</th>
                  <th className='px-4 py-2'>Status</th>
                  <th className='px-4 py-2'>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className='border-b'>
                    <td className='px-4 py-2'>{order.name}</td>
                    <td className='px-4 py-2 whitespace-nowrap'>
                      {order.items}
                    </td>
                    <td className='px-4 py-2'>
                      Rp {order.total.toLocaleString()}
                    </td>
                    <td className='px-4 py-2 capitalize'>{order.status}</td>
                    <td className='px-4 py-2'>
                      {new Date(order.createdAt).toLocaleTimeString()}
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
