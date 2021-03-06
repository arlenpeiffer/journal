import React from 'react';
import moment from 'moment';
import { Field, FieldArray, getIn } from 'formik';
import { Option, Select, TextArea, TimePicker } from './AntFields';
import { Button, Card, Form, Icon, Popconfirm } from 'antd';
import MealItem from './MealItem';

function Meal(props) {
  const { index, meals, remove, setFieldValue } = props;

  const getMealNameFromType = type => {
    switch (type) {
      case 0:
        return 'Breakfast';
      case 1:
        return 'Lunch';
      case 2:
        return 'Snack';
      case 3:
        return 'Dinner';
      case 4:
        return 'Dessert';
      default:
        return <Icon type="align-left" />;
    }
  };

  return (
    <Form.Item>
      <Card
        bodyStyle={{ paddingBottom: 0 }}
        extra={
          <Popconfirm
            cancelText="No"
            okText="Yes"
            onConfirm={() => remove(index)}
            title={'Are you sure you want to delete this meal?'}
          >
            <Button ghost={true} type="primary">
              Remove Meal
            </Button>
          </Popconfirm>
        }
        size="small"
        title={getMealNameFromType(meals[index].type)}
      >
        <Field
          component={Select}
          label="Type"
          name={`food.meals[${index}].type`}
          onSelect={type => setFieldValue(`food.meals[${index}].type`, type)}
          placeholder="Choose one"
        >
          <Option value={0}>Breakfast</Option>
          <Option value={1}>Lunch</Option>
          <Option value={3}>Dinner</Option>
          <Option value={2}>Snack</Option>
          <Option value={4}>Dessert</Option>
        </Field>
        <Field
          allowClear={false}
          component={TimePicker}
          format="h:mm A"
          label="Time"
          name={`food.meals[${index}].time`}
          onChange={time => {
            setFieldValue(`food.meals[${index}].time`, moment(time).valueOf());
          }}
          use12Hours={true}
          value={moment(meals[index].time)}
        />
        <FieldArray
          name={`food.meals[${index}].items`}
          render={arrayHelpers => {
            const { push, remove } = arrayHelpers;
            const error = getIn(arrayHelpers.form.errors, arrayHelpers.name);
            const items = getIn(arrayHelpers.form.values, arrayHelpers.name);
            const touched = getIn(arrayHelpers.form.touched, arrayHelpers.name);
            const typeError = typeof error !== 'string';
            return (
              <Form.Item
                help={error && touched && !typeError ? error : undefined}
                label="Items"
                validateStatus={error && touched && !typeError ? 'warning' : ''}
              >
                <div>
                  {items.map((item, itemIndex) => (
                    <MealItem
                      index={index}
                      itemIndex={itemIndex}
                      key={itemIndex}
                      remove={remove}
                      setFieldValue={setFieldValue}
                      type={getMealNameFromType(meals[index].type)}
                    />
                  ))}
                  <Button
                    ghost={true}
                    onClick={() =>
                      push({
                        name: '',
                        portion: '',
                        ingredients: '',
                        notes: ''
                      })
                    }
                    type="primary"
                  >
                    <Icon type="plus" />
                    Add Item
                  </Button>
                </div>
              </Form.Item>
            );
          }}
        />
        <Field
          component={TextArea}
          label="Notes"
          name={`food.meals[${index}.notes]`}
          placeholder="Meal Notes"
        />
      </Card>
    </Form.Item>
  );
}

export default Meal;
