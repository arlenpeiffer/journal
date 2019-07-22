import React from 'react';
import { Field } from 'formik';
import { Input, RadioGroup } from './AntFields';

function Travel(props) {
  const { setFieldValue, travel } = props;
  const { isTraveling } = travel;

  return (
    <div id="travel">
      <Field
        component={RadioGroup}
        name="travel.isTraveling"
        label="Are you traveling?"
        onChange={event => {
          const isTraveling = event.target.value;
          const location = isTraveling ? '' : 'Home';
          setFieldValue('travel', { isTraveling, location });
        }}
        options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
      />

      <Field
        allowClear={isTraveling}
        autoComplete="off"
        autoFocus
        component={Input}
        disabled={!isTraveling}
        name="travel.location"
        placeholder="Where ya at?"
      />
    </div>
  );
}

export default Travel;
