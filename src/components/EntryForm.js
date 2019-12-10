import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
// import { Form } from 'antd';
import * as Yup from 'yup';
import moment from 'moment';
import reduce from 'lodash.reduce';
import trim from 'lodash.trim';

// import Appointments from './Appointments';
// import Date from './Date';
// import Food from './Food';
import Mood from './Mood';
// import Movement from './Movement';
// import Notes from './Notes';
// import Pain from './Pain';
// import Sleep from './Sleep';
// import Stomach from './Stomach';
// import Stress from './Stress';
import Supplements from './Supplements';
import Travel from './Travel';

import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import EntrySection from './EntrySection';
import Select from './Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from './Input';
import Rating from './Rating';
import AutoComplete from './AutoComplete';
import Toggle from './Toggle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FieldArray from './FieldArray';
import TimePicker from './TimePicker';
import CheckboxGroup from './CheckboxGroup';

const newEntry = {
  appointments: [],
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
    level: null,
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
  stomach: {
    rating: 0,
    notes: ''
  },
  stress: {
    level: null,
    notes: ''
  },
  supplements: [],
  travel: {
    isTraveling: false,
    location: 'Home'
  }
};

const validationSchema = Yup.object().shape({
  appointments: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Appointment type is required.'),
      practitioner: Yup.string().required('Practitioner name is required.'),
      notes: Yup.string()
    })
  ),
  date: Yup.number().typeError('Date is required.'),
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
              ingredients: Yup.array(),
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
    level: Yup.number().typeError('Pain level is required.'),
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
  stomach: Yup.object().shape({
    rating: Yup.number(),
    notes: Yup.string()
  }),
  stress: Yup.object().shape({
    level: Yup.number().nullable(),
    notes: Yup.string()
  }),
  supplements: Yup.array(),
  travel: Yup.object().shape({
    isTraveling: Yup.boolean(),
    location: Yup.string().required('Location name is required.')
  })
});

function EntryForm(props) {
  const { entry, handleSubmitEntry, journal, logs } = props;

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

  const handleDuplicateDate = date => {
    const entryWithDateExists = journal.some(entry => entry.date === date);
    const isCurrentEntry = entry && entry.date === date;

    if (entryWithDateExists && !isCurrentEntry) {
      return 'There is already an entry for that date.';
    }
  };

  return (
    <Formik
      initialValues={entry ? entry : newEntry}
      onSubmit={values => handleSubmitEntry(trimValues(values, {}))}
      validationSchema={validationSchema}
    >
      {({ errors, handleSubmit, setFieldValue, values }) => (
        <Form>
          <EntrySection label="Date">
            <DatePicker
              disableFuture
              label="Date"
              name="date"
              validate={handleDuplicateDate}
            />
          </EntrySection>

          <EntrySection label="Diet">
            <Select label="Type" name="food.diet.type">
              <MenuItem value="Elimination">Elimination</MenuItem>
              <MenuItem value="Low-Starch">Low-Starch</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </Select>
            <Input
              label="Notes / Details"
              multiline
              name="food.diet.notes"
              placeholder="Add notes here.."
              type="text"
            />
          </EntrySection>

          <EntrySection label="Meals">
            <FieldArray
              buttonText="Meal"
              name="food.meals"
              newArrayItem={{
                type: undefined,
                time: moment().valueOf(),
                items: [],
                notes: ''
              }}
            >
              <Select field="type" label="Type">
                <MenuItem value={0}>Breakfast</MenuItem>
                <MenuItem value={1}>Lunch</MenuItem>
                <MenuItem value={3}>Dinner</MenuItem>
                <MenuItem value={2}>Snack</MenuItem>
                <MenuItem value={4}>Dessert</MenuItem>
              </Select>
              <TimePicker field="time" label="Time" />
              <FieldArray
                buttonText="Item"
                field="items"
                // name="items"
                label="Items"
                newArrayItem={{
                  name: '',
                  portion: '',
                  ingredients: [],
                  notes: ''
                }}
              >
                <AutoComplete
                  dataSource={logs.food}
                  field="name"
                  label="Name"
                />
                <Input field="portion" label="Portion" />
                <AutoComplete
                  field="ingredients"
                  filterSelectedOptions
                  label="Ingredients"
                  multiple
                />
                <Input
                  field="notes"
                  label="Notes / Details"
                  multiline
                  placeholder="Add notes here.."
                />
              </FieldArray>
              <Input
                field="notes"
                label="Notes"
                multiline
                placeholder="Add notes here.."
              />
            </FieldArray>
          </EntrySection>

          <EntrySection label="Supplements">
            <CheckboxGroup
              dataSource={logs.supplements}
              label="Supplements"
              name="supplements"
            />
          </EntrySection>

          <EntrySection label="Appointments">
            <FieldArray
              buttonText="Appointment"
              name="appointments"
              newArrayItem={{ type: '', practitioner: '', notes: '' }}
            >
              <AutoComplete
                dataSource={logs.appointments}
                field="type"
                label="Type"
              />
              <AutoComplete
                dataSource={logs.practitioners}
                field="practitioner"
                label="Practitioner"
              />
              <Input
                field="notes"
                label="Notes / Details"
                multiline
                placeholder="Add notes here.."
              />
            </FieldArray>
          </EntrySection>

          <Mood setFieldValue={setFieldValue} />

          <EntrySection label="Movement">
            <FieldArray
              buttonText="Movement"
              name="movement"
              newArrayItem={{ type: '', details: '' }}
            >
              <AutoComplete
                dataSource={logs.movement}
                field="type" // TODO: Look into what's happening with validation //
                label="Type"
              />
              <Input
                field="details"
                label="Notes / Details"
                placeholder="Add notes here.."
              />
            </FieldArray>
          </EntrySection>

          <EntrySection label="Pain">
            <Toggle exclusive label="Level" name="pain.level">
              <ToggleButton value={0}>None</ToggleButton>
              <ToggleButton value={1}>Low</ToggleButton>
              <ToggleButton value={2}>Moderate</ToggleButton>
              <ToggleButton value={3}>High</ToggleButton>
              <ToggleButton value={4}>Extreme</ToggleButton>
            </Toggle>
            <Input
              label="Notes / Details"
              multiline
              name="pain.details"
              placeholder="Add notes here.."
            />
          </EntrySection>

          <EntrySection label="Sleep">
            <Slider label="Amount" name="sleep.amount" />
            <Rating label="Rating" name="sleep.rating" />
            <Input
              label="Notes / Details"
              multiline
              name="sleep.notes"
              placeholder="Add notes here.."
            />
          </EntrySection>

          <EntrySection label="Stomach">
            <Rating label="Rating" name="stomach.rating" />
            <Input
              label="Notes / Details"
              multiline
              name="stomach.notes"
              placeholder="Add notes here.."
            />
          </EntrySection>

          <EntrySection label="Stress">
            <Toggle exclusive label="Level" name="stress.level">
              <ToggleButton value={0}>None</ToggleButton>
              <ToggleButton value={1}>Low</ToggleButton>
              <ToggleButton value={2}>Moderate</ToggleButton>
              <ToggleButton value={3}>High</ToggleButton>
              <ToggleButton value={4}>Extreme</ToggleButton>
            </Toggle>
            <Input
              label="Notes / Details"
              multiline
              name="stress.notes"
              placeholder="Add notes here.."
            />
          </EntrySection>

          <Travel setFieldValue={setFieldValue} travel={values.travel} />

          <EntrySection label="Notes">
            <Input
              label="Notes"
              multiline
              name="notes"
              placeholder="Overall notes about the day.."
              // type="text"
            />
          </EntrySection>

          <Button color="primary" onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal,
  logs: state.user.logs
});

export default connect(mapStateToProps)(EntryForm);
