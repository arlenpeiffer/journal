import React from 'react';
import { Field } from 'formik';
import { Input, InputNumber, RadioGroup, Select } from './AntFields';
import { Radio } from 'antd';

function Pain(props) {
  const { pain, setFieldValue } = props;

  return (
    <div id="pain">
      <Field
        buttonStyle="solid"
        component={RadioGroup}
        name="pain.rating"
        label="Pain"
      >
        <Radio.Button value={0}>None</Radio.Button>
        <Radio.Button value={1}>Low</Radio.Button>
        <Radio.Button value={2}>Medium</Radio.Button>
        <Radio.Button value={3}>High</Radio.Button>
        <Radio.Button value={4}>Extreme</Radio.Button>
      </Field>

      <Field component={Input} name="pain.details" placeholder="Details" />

      <Field
        component={RadioGroup}
        name="pain.nsaid.isTaken"
        label="Did you take an NSAID?"
        onChange={event => {
          const isTaken = event.target.value;
          isTaken
            ? setFieldValue('pain.nsaid.isTaken', isTaken)
            : setFieldValue('pain.nsaid', {
                amountTaken: 0,
                isTaken: false,
                timesTaken: 0,
                type: undefined
              });
        }}
        options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
      />

      <Field
        component={Select}
        disabled={!pain.nsaid.isTaken}
        // dropdownRender={menu => (
        //   <div>
        //     {menu}
        //     <Divider style={{ margin: '4px 0' }} />
        //     <div style={{ padding: '8px', cursor: 'pointer' }}>
        //       <Icon type="plus" /> Add item
        //     </div>
        //   </div>
        // )}
        name="pain.nsaid.type"
        onSelect={type => setFieldValue('pain.nsaid.type', type)}
        placeholder="Choose one"
      >
        <option value="Advil">Advil</option>
        <option value="Aleve">Aleve</option>
      </Field>

      <Field
        component={InputNumber}
        disabled={!pain.nsaid.isTaken}
        label="Number of times taken"
        min={0}
        name="pain.nsaid.timesTaken"
        onChange={times => setFieldValue('pain.nsaid.timesTaken', times)}
      />

      <Field
        component={InputNumber}
        disabled={!pain.nsaid.isTaken}
        label="Total amount taken"
        min={0}
        name="pain.nsaid.amountTaken"
        onChange={amount => setFieldValue('pain.nsaid.amountTaken', amount)}
      />
    </div>
  );
}

export default Pain;
