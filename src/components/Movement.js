import React from 'react';
import { Field, FieldArray } from 'formik';
import { Input } from './AntFields';
import { Button, Form } from 'antd';

function Movement(props) {
  return (
    <div id="movement">
      <Form.Item label="Movement">
        <FieldArray
          name="movement"
          render={({ push, remove }) => (
            <div>
              {props.movement.map((activity, index) => (
                <Form.Item key={index}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    name={`movement[${index}].type`}
                    placeholder="Type of activity"
                    style={{ marginBottom: 0 }}
                  />
                  <Field
                    autoComplete="off"
                    component={Input}
                    name={`movement[${index}].details`}
                    placeholder="Details such as number of laps, length of workout, or how you felt before/during/after moving.."
                    style={{ marginBottom: 0 }}
                  />
                  <Button onClick={() => remove(index)}>Remove</Button>
                </Form.Item>
              ))}
              <Button onClick={() => push({ type: '', details: '' })}>
                Add Activity
              </Button>
            </div>
          )}
        />
      </Form.Item>
    </div>
  );
}

export default Movement;
