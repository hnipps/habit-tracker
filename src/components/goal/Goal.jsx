import * as React from 'react';
import DatePicker from 'react-datepicker';

import { Button } from '../button/Button';
import { TextField } from '../text-field/TextField';

import 'react-datepicker/dist/react-datepicker.css';

export const Goal = ({ text, dueDate, onEdit, onDelete, id }) => {
  const [edit, setEdit] = React.useState(false);
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const editButton = (
    <Button type="button" className="mr2 bg-light-gray" onClick={toggleEdit}>
      Edit
    </Button>
  );
  const saveButton = (
    <Button type="submit" className="mr2 bg-light-gray" onClick={toggleEdit}>
      Save
    </Button>
  );

  if (!dueDate) {
    dueDate = new Date();
  }
  return (
    <div
      id={id}
      className="ba b--light-gray pa2 helvetica flex justify-between"
    >
      {edit ? (
        <>
          <div className="di">
            <TextField
              value={text}
              onChange={onEdit('text', event => event.target.value)}
            />
            <DatePicker selected={dueDate} onChange={onEdit('dueDate')} />
          </div>
        </>
      ) : (
        <p className="mv0 mr3 di">
          {text} - {dueDate.toDateString()}
        </p>
      )}
      <div>
        {(!edit && editButton) || saveButton}
        <Button className="bg-dark-red" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
