import React from 'react';
import moment from 'moment';
import { Field, FieldArray, getIn } from 'formik';
import { Input, Option, Select } from './AntFields';
import { Button, Form, Icon } from 'antd';
import Meal from './Meal';

function Food(props) {
  const { setFieldValue } = props;
  return (
    <div id="food">
      <Form.Item label="Diet">
        <Field
          component={Select}
          onSelect={type => setFieldValue(`food.diet.type`, type)}
          name="food.diet.type"
          style={{ marginBottom: 0 }}
        >
          <Option value="Low-Starch">Low-Starch</Option>
          <Option value="Elimination">Elimination</Option>
          <Option value="None">None</Option>
        </Field>
        <Field
          component={Input}
          name="food.diet.notes"
          placeholder="Notes"
          style={{ marginBottom: 0 }}
        />
      </Form.Item>
      <Form.Item label="Meals">
        <FieldArray
          name="food.meals"
          render={arrayHelpers => {
            const { push, remove } = arrayHelpers;
            const meals = getIn(arrayHelpers.form.values, arrayHelpers.name);
            return (
              <div>
                {meals.map((meal, index) => (
                  <Meal
                    index={index}
                    key={index}
                    meals={meals}
                    remove={remove}
                    setFieldValue={setFieldValue}
                  />
                ))}
                <Button
                  onClick={() =>
                    push({
                      type: undefined,
                      time: moment()
                        .startOf('hour')
                        .valueOf(),
                      items: [],
                      notes: ''
                    })
                  }
                >
                  <Icon type="plus" />
                  Add Meal
                </Button>
              </div>
            );
          }}
        />
      </Form.Item>
    </div>
  );
}

export default Food;
