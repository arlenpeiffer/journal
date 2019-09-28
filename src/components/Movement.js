import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'formik';
import { AutoComplete, Input } from './AntFields';
import { Button, Form, Icon, Popconfirm } from 'antd';

function Movement(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState(undefined);
  const { logs, movement } = props;

  return (
    <div id="movement">
      <Form.Item label="Movement">
        <FieldArray
          name="movement"
          render={({ push, remove }) => (
            <div>
              {movement.map((movement, index) => (
                <Form.Item key={index}>
                  <Field
                    autoComplete="off"
                    component={AutoComplete}
                    dataSource={logs.movement}
                    filterOption={(inputValue, option) => {
                      const movement = option.key.toLowerCase();
                      const value = inputValue.toLowerCase();
                      return movement.startsWith(value);
                    }}
                    name={`movement[${index}].type`}
                    onBlur={() => {
                      setIsOpen(false);
                      setSelectedInput(undefined);
                    }}
                    onChange={value => {
                      !value ? setIsOpen(false) : setIsOpen(true);
                      props.setFieldValue(`movement[${index}].type`, value);
                    }}
                    onFocus={() => {
                      setIsOpen(false);
                      setSelectedInput(index);
                    }}
                    onSelect={() => {
                      setIsOpen(false);
                      setSelectedInput(undefined);
                    }}
                    open={selectedInput === index && isOpen}
                    placeholder="Type of movement"
                    style={{ marginBottom: 0 }}
                  />
                  <Field
                    autoComplete="off"
                    component={Input}
                    name={`movement[${index}].details`}
                    placeholder="Details such as number of laps, length of workout, or how you felt before/during/after moving.."
                    style={{ marginBottom: 0 }}
                  />
                  <Popconfirm
                    cancelText="No"
                    okText="Yes"
                    onConfirm={() => remove(index)}
                    title={'Are you sure you want to delete this movement?'}
                  >
                    <Button type="primary">Remove</Button>
                  </Popconfirm>
                </Form.Item>
              ))}
              <Button
                ghost={true}
                onClick={() => push({ type: '', details: '' })}
                type="primary"
              >
                <Icon type="plus" />
                Add Movement
              </Button>
            </div>
          )}
        />
      </Form.Item>
    </div>
  );
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

export default connect(mapStateToProps)(Movement);
