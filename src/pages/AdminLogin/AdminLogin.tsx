import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        'https://wpu-cafe.vercel.app/api/auth/login',
        {
          email,
          password,
        }
      );
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error('Login error:', err.response?.data || err.message);
        setError('Login gagal. Pastikan username dan password benar.');
      } else {
        console.error('Unknown error', err);
      }
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h1 className='text-xl font-bold mb-4'>Login Admin</h1>
      {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
      <form onSubmit={handleLogin} className='space-y-4'>
        <div>
          <label className='block text-sm'>Username</label>
          <input
            type='email'
            className='w-full border rounded p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='block text-sm'>Password</label>
          <input
            type='password'
            className='w-full border rounded p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700'
        >
          Login
        </button>
      </form>
    </div>
  );
}
