import * as React from 'react';
import { Button } from '../button/Button';
import { TextField } from '../text-field/TextField';

export const Goal = ({ goal, onEdit, id }) => {
  const { text, dueDate } = goal;
  const [edit, setEdit] = React.useState(false);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const formId = `${id}-form`;

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

  return (
    <div
      id={id}
      className="ba b--light-gray pa2 helvetica flex justify-between"
    >
      {edit ? (
        <>
          <div className="di">
            <TextField value={text} onChange={onEdit('text')} />
            <TextField value={dueDate} onChange={onEdit('dueDate')} />
          </div>
          {saveButton}
        </>
      ) : (
        <p className="mv0 mr3 di">
          {text} - {dueDate}
        </p>
      )}
      <div>
        {!edit && editButton}
        <Button className="bg-dark-red">Delete</Button>
      </div>
    </div>
  );
};
