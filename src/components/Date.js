import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import { DatePicker } from './AntFields';
import moment from 'moment';

function Date(props) {
  const { date, entry, journal, setFieldValue } = props;

  const handleChange = date => {
    setFieldValue(
      'date',
      moment(date)
        .startOf('day')
        .valueOf()
    );
  };

  const handleDisabledDate = date => {
    // dates greater than current time return true (disabled)
    return date > moment();
  };

  const handleDuplicateDate = date => {
    if (entry && entry.date === date) {
      return undefined;
    } else if (journal.some(entry => entry.date === date)) {
      return 'There is already an entry for that date.';
    }
    return undefined;
  };

  return (
    <div id="date">
      <Field
        allowClear={false}
        component={DatePicker}
        disabledDate={handleDisabledDate}
        format="MMM D, YYYY"
        label="Date"
        name="date"
        onChange={handleChange}
        validate={handleDuplicateDate}
        value={date ? moment(date) : null}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(Date);
