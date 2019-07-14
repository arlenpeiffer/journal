import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { CheckboxGroup } from './AntFields';
import { Button, Checkbox, Form, Icon, Input, Popconfirm } from 'antd';
import { addSupplement, removeSupplement } from '../redux/actions/logs';

function Supplements(props) {
  const [input, setInput] = useState('');
  const [isAddingSupplement, setIsAddingSupplement] = useState(false);
  const [error, setError] = useState('');

  const {
    addSupplement,
    logs,
    removeSupplement,
    setFieldValue,
    supplements
  } = props;

  const handleAddSupplement = () => {
    if (input.trim() === '') {
      setError('Uh oh, needs a name..');
    } else if (logs.supplements.find(supplement => input === supplement)) {
      setError("There's already one of those..");
    } else {
      addSupplement(input);
      setInput('');
      setError('');
      setIsAddingSupplement(false);
    }
  };

  const handleRemoveSupplement = removedSupplement => {
    removeSupplement(removedSupplement);
    setFieldValue(
      'supplements',
      supplements.filter(supplement => supplement !== removedSupplement)
    );
  };

  return (
    <div id="supplements">
      <Field
        component={CheckboxGroup}
        name="supplements"
        label="Supplements"
        onChange={checkedValues => {
          setFieldValue('supplements', checkedValues.sort());
        }}
        style={{ marginBottom: 0 }}
      >
        {logs.supplements.map(supplement => (
          <div
            key={supplement}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Checkbox value={supplement}>{supplement}</Checkbox>
            <Popconfirm
              cancelText="No"
              okText="Yes"
              onConfirm={() => handleRemoveSupplement(supplement)}
              title={`Are you sure you want to delete ${supplement}?`}
            >
              <Icon theme="twoTone" type="close-circle" />
            </Popconfirm>
          </div>
        ))}
      </Field>
      <div style={{ marginBottom: 24 }}>
        <div onClick={() => setIsAddingSupplement(!isAddingSupplement)}>
          <Icon
            style={{ cursor: 'pointer' }}
            type={isAddingSupplement ? 'down' : 'plus'}
          />
          <span style={{ cursor: 'pointer', padding: '0 8px' }}>Add new</span>
        </div>
        {isAddingSupplement ? (
          <div style={{ display: 'flex' }}>
            <Form.Item help={error} validateStatus={error ? 'warning' : ''}>
              <Input
                allowClear
                autoFocus
                onChange={event => setInput(event.target.value)}
                onPressEnter={handleAddSupplement}
                value={input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleAddSupplement}
                style={{ marginLeft: 8, marginRight: 8 }}
                type="primary"
              >
                Add
              </Button>
            </Form.Item>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

const mapDispatchtoProps = dispatch => ({
  addSupplement: supplement => dispatch(addSupplement(supplement)),
  removeSupplement: supplement => dispatch(removeSupplement(supplement))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Supplements);
