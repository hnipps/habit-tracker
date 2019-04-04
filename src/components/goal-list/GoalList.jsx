import React from 'react';

export const GoalList = ({ children }) => {
  return (
    <ul className="list pl0 mv0">
      {children.map((child, i) => (
        <li key={i} className="mv1">
          {child}
        </li>
      ))}
    </ul>
  );
};
