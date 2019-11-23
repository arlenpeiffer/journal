import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'formik';
import moment from 'moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

function Date(props) {
  const { date, entry, error, journal, setFieldValue } = props;

  const handleChange = date => {
    setFieldValue(
      'date',
      moment(date)
        .startOf('day')
        .valueOf()
    );
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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Field
          autoOk={true} // default
          component={KeyboardDatePicker}
          disableFuture={true} // default ??
          error={error ? true : false} // default ??
          format="MMM D, YYYY" // default
          helperText={error} // default
          // initialFocusedDate={moment()} // default ??
          inputProps={{ readOnly: true }} // default ??
          label="Date"
          name="date"
          onChange={handleChange}
          validate={handleDuplicateDate}
          value={date ? moment(date) : null}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(Date);
