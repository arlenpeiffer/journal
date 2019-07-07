import React from 'react';
import { Button, Form, Icon } from 'antd';
import { DatePicker, Input, RadioGroup, Switch, TextArea } from './AntFields';
import moment from 'moment';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';

const newEntry = {
  date: moment()
    .startOf('day')
    .valueOf(),
  notes: '',
  pain: {
    rating: null,
    details: '',
    nsaid: {
      isTaken: false
    }
  },
  travel: {
    isTraveling: false,
    location: 'Home'
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
        // errors,
        // touched,
        setFieldValue
        // setFieldTouched,
        // validateField
        // validateForm
      }) => (
        <div>
          <Form onSubmit={handleSubmit}>
            <Field
              allowClear={false}
              component={DatePicker}
              format="MMM D, YYYY"
              label="Date"
              name="date"
              onChange={date =>
                setFieldValue(
                  'date',
                  moment(date)
                    .startOf('day')
                    .valueOf()
                )
              }
              validate={dateError('There is already an entry for that date.')}
              value={moment(values.date)}
            />

            <Field
              component={RadioGroup}
              name="pain.rating"
              label="Pain"
              options={[
                { label: 'None', value: 0 },
                { label: 'Low', value: 1 },
                { label: 'Medium', value: 2 },
                { label: 'High', value: 3 },
                { label: 'Extreme', value: 4 }
              ]}
            />

            <Field
              component={Input}
              name="pain.details"
              placeholder="Details"
            />

            <Field
              checked={values.pain.nsaid.isTaken}
              component={Switch}
              name="pain.nsaid.isTaken"
              label="Did you take an NSAID?"
              onChange={checked => setFieldValue('pain.nsaid.isTaken', checked)}
              // checkedChildren={<Icon type="check" />}
              // unCheckedChildren={<Icon type="close" />}
            />

            <Field
              component={RadioGroup}
              name="travel.isTraveling"
              label="Traveling"
              onChange={event => {
                const isTraveling = event.target.value;
                const location = isTraveling ? '' : 'Home';
                setFieldValue('travel', { isTraveling, location });
              }}
              options={[
                { label: 'No', value: false },
                { label: 'Yes', value: true }
              ]}
            />

            <Field
              autoComplete="off"
              autoFocus
              allowClear={values.travel.isTraveling}
              component={Input}
              disabled={!values.travel.isTraveling}
              name="travel.location"
              placeholder="Where ya at?"
              // value={
              //   values.travel.isTraveling ? values.travel.location : 'Home'
              // }
            />

            <Field
              component={TextArea}
              name="notes"
              label="Notes"
              placeholder="Notes"
              // type="text"
            />

            <Button onClick={handleSubmit} type="primary">
              Submit
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
