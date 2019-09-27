import React from 'react';
import { Field } from 'formik';
import { Input, RadioGroup } from './AntFields';
import { Radio } from 'antd';

function Stress() {
  return (
    <div className="stress">
      <Field
        buttonStyle="solid"
        component={RadioGroup}
        name="stress.level"
        label="Stress"
      >
        <Radio.Button value={0}>None</Radio.Button>
        <Radio.Button value={1}>Low</Radio.Button>
        <Radio.Button value={2}>Moderate</Radio.Button>
        <Radio.Button value={3}>High</Radio.Button>
        <Radio.Button value={4}>Extreme</Radio.Button>
      </Field>
      <Field
        autoComplete="off"
        component={Input}
        name="stress.notes"
        placeholder="Notes"
      />
    </div>
  );
}

export default Stress;
