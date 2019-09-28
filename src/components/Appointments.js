import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'formik';
import { AutoComplete, Input } from './AntFields';
import { Button, Form, Icon, Popconfirm } from 'antd';

function Appointments(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const { appointments, logs, setFieldValue } = props;

  const handleBlur = () => {
    resetState();
  };

  const handleChange = (value, index, field) => {
    if (!value) {
      resetState();
    } else {
      if (!isOpen) {
        setIsOpen(true);
        setSelectedField(field);
        setSelectedIndex(index);
      }
    }
    setFieldValue(`appointments[${index}].${field}`, value);
  };

  const handleFocus = (index, field) => {
    setIsOpen(false);
    setSelectedField(field);
    setSelectedIndex(index);
  };

  const handleOpen = (index, field) =>
    selectedField === field && selectedIndex === index && isOpen;

  const handleSelect = () => {
    resetState();
  };

  const resetState = () => {
    setIsOpen(false);
    setSelectedField(undefined);
    setSelectedIndex(undefined);
  };

  return (
    <div id="appointments">
      <Form.Item label="Appointments">
        <FieldArray
          name="appointments"
          render={({ push, remove }) => (
            <div>
              {appointments.map((appointment, index) => (
                <Form.Item key={index}>
                  <Field
                    autoComplete="off"
                    component={AutoComplete}
                    dataSource={logs.appointments}
                    filterOption={(inputValue, option) => {
                      const appointment = option.key.toLowerCase();
                      const value = inputValue.toLowerCase();
                      return appointment.startsWith(value);
                    }}
                    name={`appointments[${index}].type`}
                    onBlur={handleBlur}
                    onChange={value => {
                      handleChange(value, index, 'type');
                    }}
                    onFocus={() => handleFocus(index, 'type')}
                    onSelect={handleSelect}
                    open={handleOpen(index, 'type')}
                    placeholder="Type of appointment (ex: Therapy, Accupunture, Rhuematology)"
                    style={{ marginBottom: 0 }}
                  />
                  <Field
                    autoComplete="off"
                    component={AutoComplete}
                    dataSource={logs.practitioners}
                    filterOption={(inputValue, option) => {
                      const practitioner = option.key.toLowerCase();
                      const value = inputValue.toLowerCase();
                      return practitioner.startsWith(value);
                    }}
                    name={`appointments[${index}].practitioner`}
                    onBlur={handleBlur}
                    onChange={value => {
                      handleChange(value, index, 'practitioner');
                    }}
                    onFocus={() => handleFocus(index, 'practitioner')}
                    onSelect={handleSelect}
                    open={handleOpen(index, 'practitioner')}
                    placeholder="Practitioner"
                    style={{ marginBottom: 0 }}
                  />
                  <Field
                    autoComplete="off"
                    component={Input}
                    name={`appointments[${index}].notes`}
                    placeholder="Notes about the appointment"
                    style={{ marginBottom: 0 }}
                  />
                  <Popconfirm
                    cancelText="No"
                    okText="Yes"
                    onConfirm={() => remove(index)}
                    title={'Are you sure you want to delete this appointment?'}
                  >
                    <Button type="primary">Remove</Button>
                  </Popconfirm>
                </Form.Item>
              ))}
              <Button
                ghost={true}
                onClick={() => push({ type: '', practitioner: '', notes: '' })}
                type="primary"
              >
                <Icon type="plus" />
                Add Appointment
              </Button>
            </div>
          )}
        />
      </Form.Item>
    </div>
  );
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

export default connect(mapStateToProps)(Appointments);
