import React from 'react';

export const StyledButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = '', ...props }) => (
  <button
    className={`m-2 bg-[rgba(235,61,168,1)] border border-black rounded-3xl px-3 py-1 text-white hover:scale-105 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default StyledButton;
