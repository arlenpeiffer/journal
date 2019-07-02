import React from 'react';
import { connect } from 'react-redux';
import EntryForm from './EntryForm';
import { addEntry } from '../redux/actions/journal';

class AddEntry extends React.Component {
  onSubmit = entry => {
    this.props.addEntry(entry);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        AddEntry.js
        <EntryForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addEntry: entry => dispatch(addEntry(entry))
});

export default connect(
  null,
  mapDispatchToProps
)(AddEntry);
