import React from 'react';
import { Field } from 'formik';
import { AutoComplete, Input } from './AntFields';
import { Button, Form, Popconfirm } from 'antd';

function MealItem(props) {
  const { index, itemIndex, remove, setFieldValue } = props;
  return (
    <Form.Item key={itemIndex} label={`Item ${itemIndex + 1}`}>
      <Field
        autoComplete="off"
        component={AutoComplete}
        name={`food.meals[${index}].items[${itemIndex}].name`}
        onChange={value => {
          setFieldValue(`food.meals[${index}].items[${itemIndex}].name`, value);
        }}
        placeholder="Name"
        style={{ marginBottom: 0 }}
      />
      <Field
        component={Input}
        name={`food.meals[${index}].items[${itemIndex}].portion`}
        placeholder="Portion"
        style={{ marginBottom: 0 }}
      />
      <Field
        component={Input}
        name={`food.meals[${index}].items[${itemIndex}].notes`}
        placeholder="Notes"
        style={{ marginBottom: 0 }}
      />
      <Popconfirm
        cancelText="No"
        okText="Yes"
        onConfirm={() => remove(itemIndex)}
        title={'Are you sure you want to delete this item?'}
      >
        <Button type="primary">Remove Item</Button>
      </Popconfirm>
    </Form.Item>
  );
}

export default MealItem;
