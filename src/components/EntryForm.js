import React from 'react';
import { Button, Divider, Form, Icon, Radio } from 'antd';
import {
  CheckboxGroup,
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
import * as Yup from 'yup';

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
  supplements: [],
  travel: {
    isTraveling: false,
    location: 'Home'
  }
};

const validationSchema = Yup.object().shape({
  date: Yup.number().required(),
  notes: Yup.string(),
  pain: Yup.object().shape({
    rating: Yup.number().typeError('Pain Rating is required.'),
    details: Yup.string(),
    nsaid: Yup.object().shape({
      amountTaken: Yup.number().when('isTaken', {
        is: true,
        then: Yup.number()
          .min(1, 'Amount must be greater than zero.')
          .typeError('Gotta be a number, sorry.'), // keep exploring how to validate for number or ''
        otherwise: Yup.number().typeError('Gotta be a number, sorry.') // keep exploring how to validate for number or ''
      }),
      isTaken: Yup.boolean(),
      timesTaken: Yup.number().when('isTaken', {
        is: true,
        then: Yup.number()
          .min(1, 'Number of times must be greater than zero.')
          .typeError('Gotta be a number, sorry.'), // keep exploring how to validate for number or ''
        otherwise: Yup.number().typeError('Gotta be a number, sorry.') // keep exploring how to validate for number or ''
      }),
      type: Yup.string().when('isTaken', {
        is: true,
        then: Yup.string().required('Please select an NSAID type.'),
        otherwise: Yup.string()
      })
    })
  }),
  supplements: Yup.array(),
  travel: Yup.object().shape({
    isTraveling: Yup.boolean(),
    location: Yup.string().required('Location name is required.')
  })
});

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
      validationSchema={validationSchema}
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
              component={CheckboxGroup}
              name="supplements"
              label="Supplements"
              onChange={checkedValues =>
                setFieldValue('supplements', checkedValues)
              }
              options={props.logs.supplements}
            />

            <Field
              buttonStyle="solid"
              component={RadioGroup}
              name="pain.rating"
              label="Pain"
            >
              <Radio.Button value={0}>None</Radio.Button>
              <Radio.Button value={1}>Low</Radio.Button>
              <Radio.Button value={2}>Medium</Radio.Button>
              <Radio.Button value={3}>High</Radio.Button>
              <Radio.Button value={4}>Extreme</Radio.Button>
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
              min={0}
              name="pain.nsaid.timesTaken"
              onChange={value => setFieldValue('pain.nsaid.timesTaken', value)}
            />

            <Field
              component={InputNumber}
              disabled={!values.pain.nsaid.isTaken}
              label="Total amount taken"
              min={0}
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
  journal: state.user.journal,
  logs: state.user.logs
});

export default connect(mapStateToProps)(EntryForm);
