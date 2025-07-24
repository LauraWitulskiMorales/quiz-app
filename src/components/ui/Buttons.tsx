// Reusable Button component

import React from 'react';

export const StyledButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = '', ...props }) => (
  <button
    className={`
      ticketingregular
      text-[#f5cdea]
      text-lg
      m-2
      px-8 
      py-1
      z-20
      border border-solid
      border-t-[#f899dd] border-r-[#c3477f] border-b-[rgb(198,75,130)] border-l-[#f8a3e0]
      // rounded-none
      bg-[#f86db0]
      bg-opacity-100
      [box-shadow:-2px_0_4px_-1px_rgba(0,0,0,0.2),inset_-2px_-2px_1px_0_#c76993]
      transition-all duration-100 ease-linear
      disabled:opacity-50 
      hover:border-t-[#c76993] hover:border-r-[#fac9ec] hover:border-b-[#fac9ec] hover:border-l-[#c76993]
      hover:[box-shadow:1px_1px_4px_-1px_rgba(0,0,0,0.2),inset_-4px_-4px_3px_0_hsla(0,0%,100%,0.4)] ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default StyledButton;
