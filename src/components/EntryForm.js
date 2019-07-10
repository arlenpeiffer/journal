import React from 'react';
import { Button, Divider, Form, Icon, Radio } from 'antd';
import {
  DatePicker,
  Input,
  InputNumber,
  RadioGroup,
  Select,
  Switch,
  TextArea
} from './AntFields';
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
      amountTaken: 0,
      isTaken: false,
      timesTaken: 0,
      type: undefined
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
  const requiredError = errorMessage => values => {
    console.log('requiredError - value', values);
    return !values ? errorMessage : undefined;
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
              buttonStyle="solid"
              component={RadioGroup}
              name="pain.rating"
              label="Pain"
              validate={requiredError('Pain Rating is required')}
            >
              <Radio.Button value={1}>None</Radio.Button>
              <Radio.Button value={2}>Low</Radio.Button>
              <Radio.Button value={3}>Medium</Radio.Button>
              <Radio.Button value={4}>High</Radio.Button>
              <Radio.Button value={5}>Extreme</Radio.Button>
            </Field>

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
              onChange={checked =>
                checked
                  ? setFieldValue('pain.nsaid.isTaken', checked)
                  : setFieldValue('pain.nsaid', newEntry.pain.nsaid)
              }
              // checkedChildren={<Icon type="check" />}
              // unCheckedChildren={<Icon type="close" />}
            />

            <Field
              component={Select}
              disabled={!values.pain.nsaid.isTaken}
              // dropdownRender={menu => (
              //   <div>
              //     {menu}
              //     <Divider style={{ margin: '4px 0' }} />
              //     <div style={{ padding: '8px', cursor: 'pointer' }}>
              //       <Icon type="plus" /> Add item
              //     </div>
              //   </div>
              // )}
              name="pain.nsaid.type"
              onSelect={type => setFieldValue('pain.nsaid.type', type)}
              placeholder="Choose one"
            >
              <option value="Advil">Advil</option>
              <option value="Aleve">Aleve</option>
            </Field>

            <Field
              component={InputNumber}
              disabled={!values.pain.nsaid.isTaken}
              label="Number of times taken"
              name="pain.nsaid.timesTaken"
              onChange={value => setFieldValue('pain.nsaid.timesTaken', value)}
            />

            <Field
              component={InputNumber}
              disabled={!values.pain.nsaid.isTaken}
              label="Total amount taken"
              name="pain.nsaid.amountTaken"
              onChange={value => setFieldValue('pain.nsaid.amountTaken', value)}
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
