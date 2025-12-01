import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.user?.role);

  const handleLoginClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isLoggedIn && role !== 'admin') {
      Navigate('/admin/login');
    } else if (role === 'admin') {
      Navigate('/admin/dashboard');
    }

    console.log('LoggedIn', isLoggedIn);
    console.log('Role', role);
  };

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className='bg-white shadow p-4'>
      <div className='max-w-5xl mx-auto flex justify-between items-center'>
        <Link to='/' className='text-xl font-bold text-amber-700'>
          La-Tansa Coffee
        </Link>
        <nav className='flex gap-4'>
          <Link
            to='/'
            className='text-gray-700 hover:text-amber-700 transition'
          >
            Home
          </Link>
          <Link
            to='/cart'
            className='relative text-gray-700 hover:text-amber-700 transition'
          >
            Cart
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2'>
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to={
              !isLoggedIn && role !== 'admin'
                ? '/admin/login'
                : '/admin/dashboard'
            }
            onClick={handleLoginClick}
            className='text-gray-700 hover:text-amber-700 transition'
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
