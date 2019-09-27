import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'formik';
import { AutoComplete, Input } from './AntFields';
import { Button, Form, Icon, Popconfirm } from 'antd';

function Appointments(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(undefined);
  const [selectedInput, setSelectedInput] = useState(undefined);
  const { logs, appointments } = props;

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
                    onBlur={() => {
                      setIsOpen(false);
                      setSelectedField(undefined);
                      setSelectedInput(undefined);
                    }}
                    onChange={value => {
                      if (!value) {
                        setIsOpen(false);
                        setSelectedField(undefined);
                        setSelectedInput(undefined);
                      } else {
                        if (!isOpen) {
                          setIsOpen(true);
                          setSelectedField(0);
                          setSelectedInput(index);
                        }
                      }
                      props.setFieldValue(`appointments[${index}].type`, value);
                    }}
                    onFocus={() => {
                      setIsOpen(false);
                      setSelectedField(0);
                      setSelectedInput(index);
                    }}
                    onSelect={() => {
                      setIsOpen(false);
                      setSelectedField(undefined);
                      setSelectedInput(undefined);
                    }}
                    open={
                      selectedField === 0 && selectedInput === index && isOpen
                    }
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
                    onBlur={() => {
                      setIsOpen(false);
                      setSelectedField(undefined);
                      setSelectedInput(undefined);
                    }}
                    onChange={value => {
                      if (!value) {
                        setIsOpen(false);
                        setSelectedField(undefined);
                        setSelectedInput(undefined);
                      } else {
                        if (!isOpen) {
                          setIsOpen(true);
                          setSelectedField(1);
                          setSelectedInput(index);
                        }
                      }
                      props.setFieldValue(
                        `appointments[${index}].practitioner`,
                        value
                      );
                    }}
                    onFocus={() => {
                      setIsOpen(false);
                      setSelectedField(1);
                      setSelectedInput(index);
                    }}
                    onSelect={() => {
                      setIsOpen(false);
                      setSelectedField(undefined);
                      setSelectedInput(undefined);
                    }}
                    open={
                      selectedField === 1 && selectedInput === index && isOpen
                    }
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
