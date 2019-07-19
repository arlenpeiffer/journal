import React from 'react';
import moment from 'moment';
import { FieldArray, getIn } from 'formik';
import { Button, Form, Icon } from 'antd';
import Meal from './Meal';

function Food(props) {
  const { setFieldValue } = props;
  return (
    <div id="food">
      <Form.Item label="Food">
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
