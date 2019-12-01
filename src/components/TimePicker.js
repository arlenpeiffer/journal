import React, { useEffect } from 'react';
import { Field, useField } from 'formik';
import moment from 'moment';
import { TimePicker as MuiTimePicker } from '@material-ui/pickers';

const TimePicker = ({ name, setFieldValue, ...props }) => {
  const [date] = useField('date');
  const entryDate = date.value;
  const [time] = useField(name);
  console.log(time);
  const startOfDay = moment(time.value).startOf('day');
  const timeSinceStartOfDay = moment(time.value).diff(startOfDay);
  const selectedTimeOnEntryDate = moment(entryDate).add(timeSinceStartOfDay);
  console.log(selectedTimeOnEntryDate);

  useEffect(() => {
    console.log('useEffect', name);
    setFieldValue(name, selectedTimeOnEntryDate.valueOf());
  }, [entryDate]);

  return (
    <Field name={name} {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        {
          /* const startOfDay = moment(field.value).startOf('day');
        const timeSinceStartOfDay = moment(field.value).diff(startOfDay);
        const selectedTimeOnEntryDate = moment(entryDate).add(
          timeSinceStartOfDay
        ); */
        }

        const handleChange = value => {
          form.setFieldValue(field.name, moment(value).valueOf());
        };

        return (
          <div>
            <MuiTimePicker
              error={hasError}
              format="h:mm A"
              helperText={error}
              onChange={handleChange}
              value={selectedTimeOnEntryDate}
              {...props}
            />
            <p>Date Unix: {entryDate}</p>
            <p>Date String: {moment(entryDate).toString()}</p>
            <p>
              Date String (Formatted):{' '}
              {moment(entryDate)
                .format('dddd, MMMM Do YYYY, h:mm a')
                .toString()}
            </p>
            <p>Time Unix: {time.value}</p>
            <p>Time String (Default): {moment(time.value).toString()}</p>
            <p>
              Time String (Formatted):{' '}
              {moment(time.value)
                .format('dddd, MMMM Do YYYY, h:mm a')
                .toString()}
            </p>
            <p>
              selectedTimeOnEntryDate:{' '}
              {moment(selectedTimeOnEntryDate).format(
                'dddd, MMMM Do YYYY, h:mm a'
              )}
            </p>
          </div>
        );
      }}
    </Field>
  );
};

export default TimePicker;
