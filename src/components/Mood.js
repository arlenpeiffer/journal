import React from 'react';
import { Field } from 'formik';
import { CheckboxGroup } from './AntFields';
import { Checkbox, Col, Row } from 'antd';

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
          <Col span={8}>
            <Checkbox value="achy">Achy</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="anxious">Anxious</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="fatigued">Fatigued</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="happy">Happy</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="nauseous">Nauseous</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="sad">Sad</Checkbox>
          </Col>
        </Row>
      </Field>
    </div>
  );
}

export default Mood;
