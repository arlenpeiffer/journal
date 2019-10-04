import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { CheckboxGroup } from './AntFields';
import { Checkbox, Icon, Popconfirm } from 'antd';

import AddItem from './AddItem';
import { addSupplement, removeSupplement } from '../redux/actions/logs';

function Supplements(props) {
  const {
    addSupplement,
    logs,
    removeSupplement,
    setFieldValue,
    supplements
  } = props;

  const handleAddSupplement = (input, setError, setInput, setIsAddingItem) => {
    if (input.trim() === '') {
      setError('Uh oh, needs a name..');
    } else if (logs.supplements.find(supplement => input === supplement)) {
      setError("There's already one of those..");
    } else {
      addSupplement(input);
      setInput('');
      setError('');
      setIsAddingItem(false);
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
        <AddItem onSubmit={handleAddSupplement} />
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
