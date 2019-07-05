import React from 'react';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const newEntry = {
  date: moment()
    .startOf('day')
    .valueOf(),
  notes: '',
  location: {
    isTraveling: false,
    name: 'LA'
  }
};

function EntryForm(props) {
  const { entry, journal } = props;
  const dateError = errorMessage => value => {
    if (entry && entry.date === value) {
      return undefined;
    } else if (journal.some(entry => entry.date === value)) {
      return errorMessage;
    }
    return undefined;
  };
  return (
    <Formik
      initialValues={entry ? entry : newEntry}
      onSubmit={values => props.onSubmit(values)}
      render={({
        handleSubmit,
        handleChange,
        values,
        errors,
        // touched,
        setFieldValue
        // setFieldTouched,
        // validateField
        // validateForm
      }) => (
        <div>
          <Form onSubmit={handleSubmit}>
            <Field
              name="date"
              validate={dateError('There is already an entry for that date.')}
              render={({ field, form: { errors, touched } }) => (
                <FormItem
                  label="Date"
                  validateStatus={errors.date && touched.date ? 'warning' : ''}
                  help={touched.date && errors.date}
                >
                  <DatePicker
                    {...field}
                    allowClear={false}
                    defaultValue={moment(values.date)}
                    format={`MMM D, YYYY`}
                    name="date"
                    onChange={(date, dateString) =>
                      setFieldValue(
                        'date',
                        moment(date)
                          .startOf('day')
                          .valueOf()
                      )
                    }
                    value={moment(values.date)}
                  />
                </FormItem>
              )}
            />

            <FormItem label="Traveling">
              <Radio.Group
                name="location.isTraveling"
                onChange={handleChange}
                value={values.location.isTraveling}
              >
                <Radio value={false}>No</Radio>
                <Radio value={true}>Yes</Radio>
              </Radio.Group>
              <Input
                name="location.name"
                disabled={!values.location.isTraveling}
                onChange={handleChange}
                placeholder={values.location.isTraveling ? '' : 'LA'}
                value={values.location.name}
              />
            </FormItem>

            <FormItem label="Notes">
              <TextArea
                name="notes"
                onChange={handleChange}
                placeholder={`Notes`}
                value={values.notes}
              />
            </FormItem>

            <Button onClick={handleSubmit} type={`primary`}>
              Add
            </Button>
          </Form>
        </div>
      )}
    />
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(EntryForm);
