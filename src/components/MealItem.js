import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { AutoComplete, Input } from './AntFields';
import { Button, Card, Form, Popconfirm } from 'antd';

function MealItem(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState(undefined);
  const { index, itemIndex, logs, remove, setFieldValue } = props;
  return (
    <Form.Item>
      <Card
        extra={
          <Popconfirm
            cancelText="No"
            okText="Yes"
            onConfirm={() => remove(itemIndex)}
            title={'Are you sure you want to delete this item?'}
          >
            <Button ghost={true} type="primary">
              Remove Item
            </Button>
          </Popconfirm>
        }
        size="small"
        title={`Item ${itemIndex + 1}`}
      >
        <Field
          autoComplete="off"
          component={AutoComplete}
          dataSource={logs.food}
          filterOption={true}
          name={`food.meals[${index}].items[${itemIndex}].name`}
          onBlur={() => {
            setIsOpen(false);
            setSelectedInput(undefined);
          }}
          onChange={value => {
            !value ? setIsOpen(false) : setIsOpen(true);
            setFieldValue(
              `food.meals[${index}].items[${itemIndex}].name`,
              value
            );
          }}
          onFocus={() => {
            setIsOpen(false);
            setSelectedInput(itemIndex);
          }}
          onSelect={() => {
            setIsOpen(false);
            setSelectedInput(undefined);
          }}
          open={selectedInput === itemIndex && isOpen}
          placeholder="Name"
          style={{ marginBottom: 0 }}
        />
        <Field
          autoComplete="off"
          component={Input}
          name={`food.meals[${index}].items[${itemIndex}].portion`}
          placeholder="Portion"
          style={{ marginBottom: 0 }}
        />
        <Field
          autoComplete="off"
          component={Input}
          name={`food.meals[${index}].items[${itemIndex}].ingredients`}
          placeholder="Ingredients"
          style={{ marginBottom: 0 }}
        />
        <Field
          autoComplete="off"
          component={Input}
          name={`food.meals[${index}].items[${itemIndex}].notes`}
          placeholder="Notes"
          style={{ marginBottom: 0 }}
        />
      </Card>
    </Form.Item>
  );
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

export default connect(mapStateToProps)(MealItem);
