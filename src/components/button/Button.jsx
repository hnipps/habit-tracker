import React from 'react';

export const Button = ({ children, className }) => {
  return (
    <button className={['bn', className].join(' ').trim()}>{children}</button>
  );
};
