import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { editEntry } from '../redux/actions/journal';
import { updateLogs } from '../utils/logs';

const EditEntry = props => {
  const { editEntry, entry, history } = props;

  const handleSubmitEntry = editedEntry => {
    const { id } = entry;
    editEntry(editedEntry, id);
    updateLogs(editedEntry);
    history.push('/view');
  };

  return <EntryForm entry={entry} handleSubmitEntry={handleSubmitEntry} />;
};

const mapStateToProps = (state, ownProps) => ({
  entry: state.user.journal.find(entry => entry.id === ownProps.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editEntry: (editedEntry, id) => dispatch(editEntry(editedEntry, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
