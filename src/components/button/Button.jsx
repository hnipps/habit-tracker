import React from 'react';

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={['bn', className].join(' ').trim()} {...props}>
      {children}
    </button>
  );
};
