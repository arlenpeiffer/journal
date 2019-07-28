import React from 'react';
import moment from 'moment';
import { Field, FieldArray, getIn } from 'formik';
import { Option, Select, TextArea, TimePIcker } from './AntFields';
import { Button, Card, Form, Icon, Popconfirm } from 'antd';
import MealItem from './MealItem';

function Meal(props) {
  const { index, meals, remove, setFieldValue } = props;

  return (
    <Form.Item>
      <Card
        extra={
          <Popconfirm
            cancelText="No"
            okText="Yes"
            onConfirm={() => remove(index)}
            title={'Are you sure you want to delete this meal?'}
          >
            <Button type="primary">Remove Meal</Button>
          </Popconfirm>
        }
        key={index}
        title={
          <Field
            component={Select}
            name={`food.meals[${index}].type`}
            onSelect={type => setFieldValue(`food.meals[${index}].type`, type)}
            placeholder="Choose one"
            style={{ marginBottom: 0, width: 125 }}
          >
            <Option value={0}>Breakfast</Option>
            <Option value={1}>Lunch</Option>
            <Option value={3}>Dinner</Option>
            <Option value={2}>Snack</Option>
            <Option value={4}>Dessert</Option>
          </Field>
        }
      >
        <Field
          allowClear={false}
          component={TimePIcker}
          format="h:mm A"
          hourStep={1}
          minuteStep={5}
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
            const items = getIn(arrayHelpers.form.values, arrayHelpers.name);
            return (
              <div style={{ marginBottom: 24 }}>
                {items.map((item, itemIndex) => (
                  <MealItem
                    index={index}
                    itemIndex={itemIndex}
                    key={itemIndex}
                    remove={remove}
                    setFieldValue={setFieldValue}
                  />
                ))}
                <Button
                  onClick={() =>
                    push({
                      name: '',
                      portion: '',
                      notes: ''
                    })
                  }
                >
                  <Icon type="plus" />
                  Add Meal Item
                </Button>
              </div>
            );
          }}
        />{' '}
        <Field
          component={TextArea}
          name={`food.meals[${index}.notes]`}
          placeholder="Meal Notes"
        />
      </Card>
    </Form.Item>
  );
}

export default Meal;
