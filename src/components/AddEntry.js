import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { addEntry } from '../redux/actions/journal';
import { updateLogs } from '../utils';

const AddEntry = props => {
  const { addEntry, history, logs } = props;

  const handleSubmitEntry = entry => {
    addEntry(entry);
    updateLogs(entry, logs);
    history.push('/view');
  };

  return <EntryForm handleSubmitEntry={handleSubmitEntry} />;
};

const mapStateToProps = state => ({
  logs: state.user.logs
});

const mapDispatchToProps = dispatch => ({
  addEntry: entry => dispatch(addEntry(entry))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
