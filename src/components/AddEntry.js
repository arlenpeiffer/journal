import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { addEntry } from '../redux/actions/journal';
import { updateLogs } from '../utils/logs';

const AddEntry = props => {
  const { addEntry, history } = props;

  const handleSubmitEntry = entry => {
    addEntry(entry);
    updateLogs(entry);
    history.push('/view');
  };

  return <EntryForm handleSubmitEntry={handleSubmitEntry} />;
};

const mapDispatchToProps = dispatch => ({
  addEntry: entry => dispatch(addEntry(entry))
});

export default connect(null, mapDispatchToProps)(AddEntry);
