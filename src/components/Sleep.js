import React from 'react';
import { Field } from 'formik';
import { Input, Rate, TimePicker } from './AntFields';
import moment from 'moment';

function Sleep(props) {
  const { date, sleep, setFieldValue } = props;

  const getTimeFormat = timeSlept =>
    timeSlept < 3600000 ? '0 [hr] m [min]' : 'h [hr] m [min]';

  const getTimeSlept = time => {
    return moment(time).diff(moment(time).startOf('day'));
  };

  return (
    <div className="sleep">
      <Field
        allowClear={false}
        component={TimePicker}
        defaultOpenValue={moment(date)}
        disabledHours={() => [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
        format={getTimeFormat(sleep.amount)}
        hideDisabledOptions={true}
        hourStep={1}
        inputReadOnly={true}
        label="Sleep"
        minuteStep={15}
        name="sleep.amount"
        onChange={time => {
          setFieldValue('sleep.amount', getTimeSlept(time));
        }}
        value={sleep.amount === null ? null : moment(date + sleep.amount)}
      />
      <Field
        allowClear={true}
        component={Rate}
        name="sleep.rating"
        onChange={value =>
          setFieldValue('sleep.rating', value === sleep.rating ? 0 : value)
        }
      />
      <Field
        autoComplete="off"
        component={Input}
        name="sleep.notes"
        placeholder="Notes"
      />
    </div>
  );
}

export default Sleep;
