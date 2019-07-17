import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import * as Yup from 'yup';
import moment from 'moment';

import Date from './Date';
import Movement from './Movement';
import Notes from './Notes';
import Pain from './Pain';
import Supplements from './Supplements';
import Travel from './Travel';

const newEntry = {
  date: moment()
    .startOf('day')
    .valueOf(),
  movement: [],
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
    movement: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required('Activity type is required.'),
        notes: Yup.string()
      })
    ),
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
  const { entry } = props;
  return (
    <Formik
      initialValues={entry ? entry : newEntry}
      onSubmit={values => props.onSubmit(values)}
      validationSchema={validationSchema}
      render={({
        handleSubmit,
        // handleChange,
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
            <Date
              date={values.date}
              entry={entry}
              setFieldValue={setFieldValue}
            />
            <Supplements
              setFieldValue={setFieldValue}
              supplements={values.supplements}
            />
            <Movement
              movement={values.movement}
              setFieldValue={setFieldValue}
            />
            <Pain pain={values.pain} setFieldValue={setFieldValue} />
            <Travel setFieldValue={setFieldValue} travel={values.travel} />
            <Notes />
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Form>
        </div>
      )}
    />
  );
}

export default EntryForm;
