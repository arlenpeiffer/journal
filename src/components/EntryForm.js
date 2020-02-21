import React from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import moment from 'moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';

import AddItem from './AddItem';
import AutoComplete from './AutoComplete';
import ButtonPrimary from './ButtonPrimary';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import EntrySection from './EntrySection';
import FieldArray from './FieldArray';
import Input from './Input';
import Rating from './Rating';
import Select from './Select';
import Slider from './Slider';
import Switch from './Switch';
import TimePicker from './TimePicker';
import Toggle from './Toggle';

import {
  addDiet,
  addMedication,
  addMood,
  addSupplement
} from '../redux/actions/logs';
import { entryFormSchema } from '../schemas/entryFormSchema';
import { formatMealType, formatSleepAmount, trimValues } from '../utils';

const initialValues = {
  appointments: [],
  date: moment()
    .startOf('day')
    .valueOf(),
  food: {
    diet: {
      type: 'None',
      notes: ''
    },
    meals: []
  },
  medication: [],
  mood: [],
  movement: [],
  notes: '',
  pain: {
    level: null,
    details: ''
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

const EntryForm = ({
  addDiet,
  addMedication,
  addMood,
  addSupplement,
  entry,
  handleSubmitEntry,
  journal,
  logs
}) => {
  const handleDuplicateDate = date => {
    const entryWithDateExists = journal.some(entry => entry.date === date);
    const isCurrentEntry = entry && entry.date === date;

    if (entryWithDateExists && !isCurrentEntry) {
      return 'There is already an entry for that date.';
    }
  };

  return (
    <Formik
      initialValues={entry ? entry : initialValues}
      onSubmit={values => handleSubmitEntry(trimValues(values, {}))}
      validationSchema={entryFormSchema}
    >
      {({ handleSubmit, values }) => {
        const { isTraveling } = values.travel;

        return (
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
              <Select
                addItemCallback={addDiet}
                dataSource={logs.diets}
                emptyPrompt="No diets added yet.."
                includeAddItem
                label="Type"
                name="food.diet.type"
              >
                <MenuItem value="None">None</MenuItem>
              </Select>
              <Input
                label="Notes / Details"
                multiline
                name="food.diet.notes"
                placeholder="Add notes here.."
              />
            </EntrySection>

            <EntrySection label="Meals">
              <FieldArray
                buttonText="Meal"
                name="food.meals"
                newArrayItem={{
                  type: null,
                  time: moment().valueOf(),
                  items: [],
                  notes: ''
                }}
              >
                <Select field="type" formatValue={formatMealType} label="Type">
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
                emptyPrompt="No supplements added yet.."
                label="Supplements"
                name="supplements"
              />
              <AddItem callback={addSupplement} dataSource={logs.supplements} />
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
                dataSource={logs.moods}
                emptyPrompt="No moods added yet.."
                label="Mood"
                name="mood"
              />
              <AddItem callback={addMood} dataSource={logs.moods} />
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

            <EntrySection label="Medication">
              <FieldArray
                buttonText="Medication"
                name="medication"
                newArrayItem={{ type: '', dose: '', notes: '' }}
              >
                <Select
                  addItemCallback={addMedication}
                  dataSource={logs.medications}
                  emptyPrompt="No medications added yet.."
                  field="type"
                  includeAddItem
                  label="Type"
                />
                <Input
                  field="dose"
                  InputProps={{
                    endAdornment: <InputAdornment>mg</InputAdornment>
                  }}
                  label="Dose"
                  placeholder="Amount taken (in mg)"
                />
                <Input
                  field="notes"
                  label="Notes / Details"
                  multiline
                  placeholder="Add notes here.."
                />
              </FieldArray>
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

            <EntrySection label="Travel">
              <Switch label="Are you traveling?" name="travel.isTraveling" />
              <Input
                allowReset
                disabled={!isTraveling}
                label="Location"
                name="travel.location"
                placeholder="Where ya at?"
                resetDependencies={[isTraveling]}
                resetValue={isTraveling ? '' : 'Home'}
              />
            </EntrySection>

            <EntrySection label="Notes">
              <Input
                label="Notes"
                multiline
                name="notes"
                placeholder="Overall notes about the day.."
              />
            </EntrySection>

            <ButtonPrimary onClick={handleSubmit}>Submit</ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = state => ({
  journal: state.user.journal,
  logs: state.user.logs
});

const mapDispatchToProps = dispatch => ({
  addDiet: diet => dispatch(addDiet(diet)),
  addMedication: medication => dispatch(addMedication(medication)),
  addMood: mood => dispatch(addMood(mood)),
  addSupplement: supplement => dispatch(addSupplement(supplement))
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
