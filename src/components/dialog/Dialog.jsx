import React from 'react';

import './dialog.css';

export const Dialog = ({ children, ...props }) => {
  return (
    <div className="z-2 absolute b--dark-gray ba dialog pa2" {...props}>
      {children}
    </div>
  );
};
