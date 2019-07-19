import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, FieldArray, getIn } from 'formik';
import { AutoComplete, Input, Select, TextArea, TimePIcker } from './AntFields';
import { Button, Form, Icon, Popconfirm, Select as AntSelect } from 'antd';

const Option = AntSelect.Option;

function Food(props) {
  const { food, setFieldValue } = props;

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
                  <Form.Item key={index}>
                    <Field
                      component={Select}
                      name={`food.meals[${index}].type`}
                      onSelect={type =>
                        setFieldValue(`food.meals[${index}].type`, type)
                      }
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
                      component={TimePIcker}
                      format="h:mm"
                      hourStep={1}
                      minuteStep={5}
                      name={`food.meals[${index}].time`}
                      onChange={time => {
                        setFieldValue(
                          `food.meals[${index}].time`,
                          moment(time).valueOf()
                        );
                      }}
                      use12Hours={true}
                      value={moment(food.meals[index].time)}
                    />
                    <FieldArray
                      name={`food.meals[${index}].items`}
                      render={arrayHelpers => {
                        const { push, remove } = arrayHelpers;
                        const items = getIn(
                          arrayHelpers.form.values,
                          arrayHelpers.name
                        );
                        return (
                          <div style={{ marginBottom: 24 }}>
                            {items.map((item, itemIndex) => (
                              <Form.Item
                                key={itemIndex}
                                label={`Item ${itemIndex + 1}`}
                              >
                                <Field
                                  autoComplete="off"
                                  component={AutoComplete}
                                  name={`food.meals[${index}].items[${itemIndex}].name`}
                                  onChange={value => {
                                    props.setFieldValue(
                                      `food.meals[${index}].items[${itemIndex}].name`,
                                      value
                                    );
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
                                  title={
                                    'Are you sure you want to delete this item?'
                                  }
                                >
                                  <Button type="primary">Remove Item</Button>
                                </Popconfirm>
                              </Form.Item>
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
                    />
                    <Field
                      component={TextArea}
                      name={`food.meals[${index}.notes]`}
                      placeholder="Meal Notes"
                    />
                    <Popconfirm
                      cancelText="No"
                      okText="Yes"
                      onConfirm={() => remove(index)}
                      title={'Are you sure you want to delete this meal?'}
                    >
                      <Button type="primary">Remove Meal</Button>
                    </Popconfirm>
                  </Form.Item>
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
