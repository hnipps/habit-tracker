import React from 'react';

export const TextField = ({ type, ...props }) => {
  return <input type="text" {...props} />;
};
