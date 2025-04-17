// components/DialogOverlay.tsx
import React from 'react';

type DialogOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const DialogOverlay: React.FC<DialogOverlayProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-90'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative'
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className='text-xl font-semibold mb-4 border-b pb-2'>{title}</h2>
        )}
        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
          onClick={onClose}
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DialogOverlay;
