import * as React from 'react';

export const Goal = ({ text, dueDate }) => {
  return (
    <div className="ba b--light-gray pa2 helvetica flex justify-between">
      <p className="mv0 mr3 di">
        {text} - {dueDate}
      </p>
      <div>
        <button className="mr2">Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};
