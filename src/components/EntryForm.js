import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import * as Yup from 'yup';
import moment from 'moment';
import reduce from 'lodash.reduce';
import trim from 'lodash.trim';

import Date from './Date';
import Food from './Food';
import Mood from './Mood';
import Movement from './Movement';
import Notes from './Notes';
import Pain from './Pain';
import Sleep from './Sleep';
import Supplements from './Supplements';
import Travel from './Travel';

const newEntry = {
  date: moment()
    .startOf('day')
    .valueOf(),
  food: {
    diet: {
      type: 'Low-Starch',
      notes: ''
    },
    meals: []
  },
  mood: [],
  movement: [],
  notes: '',
  pain: {
    rating: null,
    details: '',
    nsaid: {
      amountTaken: 0,
      isTaken: false,
      timesTaken: 0,
      type: ''
    }
  },
  sleep: {
    amount: null,
    rating: 0,
    notes: ''
  },
  supplements: [],
  travel: {
    isTraveling: false,
    location: 'Home'
  }
};

const validationSchema = Yup.object().shape({
  date: Yup.number().required(),
  food: Yup.object().shape({
    diet: Yup.object().shape({
      type: Yup.string(),
      notes: Yup.string()
    }),
    meals: Yup.array().of(
      Yup.object().shape({
        type: Yup.number().required('Meal type is required.'),
        time: Yup.number(),
        items: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required('Meal item name is required.'),
              portion: Yup.string().required('Meal item portion is required.'),
              ingredients: Yup.string(),
              notes: Yup.string()
            })
          )
          .min(1, 'Meal must have at least one item.'),
        notes: Yup.string()
      })
    )
  }),
  mood: Yup.array(),
  movement: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Movement type is required.'),
      notes: Yup.string()
    })
  ),
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
  sleep: Yup.object().shape({
    amount: Yup.number().typeError('Sleep amount is required.'),
    rating: Yup.number().min(1, 'Sleep rating is required.'),
    notes: Yup.string()
  }),
  supplements: Yup.array(),
  travel: Yup.object().shape({
    isTraveling: Yup.boolean(),
    location: Yup.string().required('Location name is required.')
  })
});

function EntryForm(props) {
  const { entry, handleSubmitEntry } = props;

  const trimValues = (object, container) =>
    reduce(
      object,
      function(acc, value, key) {
        typeof value === 'object'
          ? Array.isArray(value)
            ? value.some(item => typeof item === 'object')
              ? (acc[key] = trimValues(value, []))
              : (acc[key] = value)
            : (acc[key] = trimValues(value, {}))
          : typeof value === 'string'
          ? (acc[key] = trim(value))
          : (acc[key] = value);
        return acc;
      },
      container
    );

  return (
    <Formik
      initialValues={entry ? entry : newEntry}
      onSubmit={values => handleSubmitEntry(trimValues(values, {}))}
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
            <Food setFieldValue={setFieldValue} />
            <Supplements
              setFieldValue={setFieldValue}
              supplements={values.supplements}
            />
            <Mood setFieldValue={setFieldValue} />
            <Movement
              movement={values.movement}
              setFieldValue={setFieldValue}
            />
            <Pain pain={values.pain} setFieldValue={setFieldValue} />
            <Sleep
              date={values.date}
              sleep={values.sleep}
              setFieldValue={setFieldValue}
            />
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
