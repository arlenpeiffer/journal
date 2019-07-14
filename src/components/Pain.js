import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { Input, InputNumber, RadioGroup, Select } from './AntFields';
import {
  Button,
  Divider,
  Form,
  Icon,
  Input as AntInput,
  Radio,
  Select as AntSelect
} from 'antd';
import { addNsaid } from '../redux/actions/logs';

const Option = AntSelect.Option;

function Pain(props) {
  const [input, setInput] = useState('');
  const [isAddingNsaid, setIsAddingNsaid] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { addNsaid, logs, pain, setFieldValue } = props;

  const handleAddNsaid = () => {
    if (input.trim() === '') {
      setError('Uh oh, needs a name..');
    } else if (logs.supplements.find(supplement => input === supplement)) {
      setError("There's already one of those..");
    } else {
      addNsaid(input);
      setInput('');
      setError('');
      setIsAddingNsaid(false);
    }
  };

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
        dropdownRender={options => (
          <div>
            {options}
            <Divider style={{ margin: 0 }} />
            <div
              onMouseDown={() => {
                setIsAddingNsaid(!isAddingNsaid);
              }}
              style={{
                paddingBottom: isAddingNsaid ? '0px' : '8px',
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingTop: '8px',
                cursor: 'pointer'
              }}
            >
              <Icon type={isAddingNsaid ? 'down' : 'plus'} /> Add item
            </div>
            {isAddingNsaid ? (
              <div
                style={{
                  display: 'flex',
                  paddingLeft: '8px',
                  paddingRight: '8px'
                }}
              >
                <Form.Item
                  help={error}
                  style={{ marginBottom: '8px' }}
                  validateStatus={error ? 'warning' : ''}
                >
                  <AntInput
                    allowClear
                    autoFocus
                    onChange={event => setInput(event.target.value)}
                    onPressEnter={handleAddNsaid}
                    value={input}
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: '8px' }}>
                  <Button
                    onClick={handleAddNsaid}
                    style={{ marginLeft: 8, marginRight: 8 }}
                    type="primary"
                  >
                    Add
                  </Button>
                </Form.Item>
              </div>
            ) : null}
          </div>
        )}
        name="pain.nsaid.type"
        onDropdownVisibleChange={open =>
          isAddingNsaid ? setIsOpen(true) : setIsOpen(open)
        }
        onSelect={type => setFieldValue('pain.nsaid.type', type)}
        open={isOpen}
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
  addNsaid: nsaid => dispatch(addNsaid(nsaid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pain);
