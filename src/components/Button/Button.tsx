import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  onConfirm,
  onCancel,
  onClose,
  disabled = false,
  loading = false,
  variant = 'primary',
  className,
  iconLeft,
  iconRight,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (onConfirm) onConfirm();
        if (onCancel) onCancel();
        if (onClose) onClose();
      }} // Call onClick if providedonClick}
      disabled={isDisabled}
      className={clsx(baseStyles, variantStyles[variant], className, {
        'opacity-50 cursor-not-allowed': isDisabled,
      })}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {iconLeft && <span className='mr-1'>{iconLeft}</span>}
          {children}
          {iconRight && <span className='ml-1'>{iconRight}</span>}
        </>
      )}
    </button>
  );
};

const Spinner = () => (
  <svg
    className='animate-spin h-5 w-5 text-white'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v4l3.5-3.5L12 20v-4a8 8 0 01-8-8z'
    />
  </svg>
);

export default Button;
