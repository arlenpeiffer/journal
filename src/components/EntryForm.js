import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
// import { Form } from 'antd';
import moment from 'moment';
import reduce from 'lodash.reduce';
import trim from 'lodash.trim';

// import Appointments from './Appointments';
// import Date from './Date';
// import Food from './Food';
// import Mood from './Mood';
// import Movement from './Movement';
// import Notes from './Notes';
// import Pain from './Pain';
// import Sleep from './Sleep';
// import Stomach from './Stomach';
// import Stress from './Stress';
// import Supplements from './Supplements';
import Travel from './Travel';

import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import EntrySection from './EntrySection';
import Select from './Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from './Input';
import Rating from './Rating';
import Slider from './Slider';
import AutoComplete from './AutoComplete';
import Toggle from './Toggle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FieldArray from './FieldArray';
import TimePicker from './TimePicker';
import CheckboxGroup from './CheckboxGroup';

import { entryFormSchema } from '../schemas/entryFormSchema';
import { formatSleepAmount } from '../utils';

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
    amount: -1,
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
      validationSchema={entryFormSchema}
    >
      {({ errors, handleSubmit, setFieldValue, values }) => (
        <Form>
          {console.log(values)}
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

          <EntrySection label="Mood">
            <CheckboxGroup
              dataSource={['logs.moods']}
              label="Mood"
              name="mood"
            />
          </EntrySection>

          <EntrySection label="Movement">
            <FieldArray
              buttonText="Movement"
              name="movement"
              newArrayItem={{ type: '', details: '' }}
            >
              <AutoComplete
                dataSource={logs.movement}
                field="type"
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
            <Slider
              defaultDisplayText="Select an amount"
              formatDisplayText={formatSleepAmount}
              label="Amount"
              max={12}
              min={0}
              name="sleep.amount"
              step={0.25}
            />
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
