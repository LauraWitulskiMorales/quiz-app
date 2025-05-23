import React from "react";

export const StyledButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = '', ...props }) => (
  <button
    className={`m-2 bg-[rgba(75,5,227,0.5)] rounded-sm px-4 py-1.5 text-white disabled:opacity-50 hover:scale-105 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default StyledButton;