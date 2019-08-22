import React from 'react';
import { Field } from 'formik';
import { Input, Rate } from './AntFields';

function Stomach(props) {
  const { setFieldValue, stomach } = props;
  return (
    <div className="stomach">
      <Field
        allowClear={true}
        component={Rate}
        label="Stomach"
        name="stomach.rating"
        onChange={value =>
          setFieldValue('stomach.rating', value === stomach.rating ? 0 : value)
        }
      />
      <Field
        autoComplete="off"
        component={Input}
        name="stomach.notes"
        placeholder="Notes"
      />
    </div>
  );
}

export default Stomach;
