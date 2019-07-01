import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { editEntry } from '../redux/actions/journal';

class EditEntry extends React.Component {
  onSubmit = editedEntry => {
    const { id } = this.props.entry;
    this.props.editEntry(id, editedEntry);
    this.props.history.push('/');
  };
  render() {
    const { entry } = this.props;
    return (
      <div>
        EditEntry.js
        <Form entry={entry} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  entry: state.user.journal.find(entry => entry.id === ownProps.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editEntry: (id, editedEntry) => dispatch(editEntry(id, editedEntry))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntry);
