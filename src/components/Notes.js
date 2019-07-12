import React from 'react';
import { Field } from 'formik';
import { TextArea } from './AntFields';

function Notes() {
  return (
    <div id="notes">
      <Field
        component={TextArea}
        label="Notes"
        name="notes"
        placeholder="Notes"
      />
    </div>
  );
}

export default Notes;
