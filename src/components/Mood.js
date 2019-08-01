import React from 'react';
import { Field } from 'formik';
import { CheckboxGroup } from './AntFields';
import { Checkbox, Col, Row } from 'antd';
import capitalize from 'lodash.capitalize';

const moods = [
  'achy',
  'anxious',
  'calm',
  'confused',
  'energetic',
  'exhuasted',
  'fatigued',
  'frustrated',
  'happy',
  'heavy',
  'hopeful',
  'irritable',
  'light',
  'nauseous',
  'relaxed',
  'rested',
  'sad',
  'stuck',
  'uncomfortable'
];

function Mood(props) {
  const { setFieldValue } = props;

  return (
    <div className="mood">
      <Field
        component={CheckboxGroup}
        label="Mood"
        name="mood"
        onChange={checkedValues => {
          setFieldValue('mood', checkedValues.sort());
        }}
      >
        <Row>
          {moods.map(mood => (
            <Col span={8}>
              <Checkbox value={mood}>{capitalize(mood)}</Checkbox>
            </Col>
          ))}
        </Row>
      </Field>
    </div>
  );
}

export default Mood;
