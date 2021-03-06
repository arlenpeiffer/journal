import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { Input, InputNumber, Option, RadioGroup, Select } from './AntFields';
import { Divider, Icon, Radio } from 'antd';

import AddItem from './AddItem';
import { addNsaidSuccess } from '../redux/actions/logs';

function Pain(props) {
  const { addNsaidSuccess, logs, pain, setFieldValue } = props;

  const handleAddNsaid = (input, setError, setInput, setIsAddingItem) => {
    if (input.trim() === '') {
      setError('Uh oh, needs a name..');
    } else if (logs.nsaid.find(nsaid => input === nsaid)) {
      setError("There's already one of those..");
    } else {
      addNsaidSuccess(input);
      setInput('');
      setError('');
      setIsAddingItem(false);
    }
  };

  return (
    <div id="pain">
      <Field
        buttonStyle="solid"
        component={RadioGroup}
        name="pain.level"
        label="Pain"
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
        name="pain.details"
        placeholder="Details"
      />

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
                type: ''
              });
        }}
        options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
      />

      <Field
        component={Select}
        disabled={!pain.nsaid.isTaken}
        dropdownRender={options => (
          <div>
            {options}
            <Divider style={{ margin: 0 }} />
            <AddItem padding={8} onSubmit={handleAddNsaid} />
          </div>
        )}
        name="pain.nsaid.type"
        onSelect={type => setFieldValue('pain.nsaid.type', type)}
        placeholder="Choose one"
        suffixIcon={<Icon type="smile" />}
      >
        {logs.nsaid.map(nsaid => (
          <Option key={nsaid} value={nsaid}>
            {nsaid}
          </Option>
        ))}
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

const mapStateToProps = state => ({
  logs: state.user.logs
});

const mapDispatchToProps = dispatch => ({
  addNsaidSuccess: nsaid => dispatch(addNsaidSuccess(nsaid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pain);
