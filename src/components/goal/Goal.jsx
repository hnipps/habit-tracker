import * as React from 'react';
import { Button } from '../button/Button';

export const Goal = ({ text, dueDate }) => {
  return (
    <div className="ba b--light-gray pa2 helvetica flex justify-between">
      <p className="mv0 mr3 di">
        {text} - {dueDate}
      </p>
      <div>
        <Button className="mr2 bg-light-gray">Edit</Button>
        <Button className="bg-dark-red">Delete</Button>
      </div>
    </div>
  );
};
