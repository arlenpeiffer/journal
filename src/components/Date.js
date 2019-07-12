import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { DatePicker } from './AntFields';
import moment from 'moment';

function Date(props) {
  const { date, entry, journal, setFieldValue } = props;

  const handleDuplicate = selectedDate => {
    if (entry && entry.date === selectedDate) {
      return undefined;
    } else if (journal.some(entry => entry.date === selectedDate)) {
      return 'There is already an entry for that date.';
    }
    return undefined;
  };

  return (
    <div id="date">
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
        validate={handleDuplicate}
        value={moment(date)}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(Date);
