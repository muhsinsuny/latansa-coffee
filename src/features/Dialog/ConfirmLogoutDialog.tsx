// components/dialogs/ConfirmLogoutDialog.tsx

import Button from '../../components/Button/Button';

interface Props {
  onClose: () => void;
}

const ConfirmLogoutDialog = ({ onClose }: Props) => {
  const handleLogout = () => {
    // logout logic here
    console.log('Logged out');
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-xl shadow-lg space-y-4'>
        <h2 className='text-lg font-bold'>Konfirmasi</h2>
        <p>Apakah kamu yakin ingin logout?</p>
        <div className='flex justify-end gap-2'>
          <Button variant='primary' onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutDialog;
