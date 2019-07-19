import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { editEntry } from '../redux/actions/journal';
import { addFood, addMovement } from '../redux/actions/logs';

class EditEntry extends React.Component {
  onSubmit = editedEntry => {
    const { id } = this.props.entry;
    this.props.editEntry(id, editedEntry);
    this.props.history.push('/');
    editedEntry.food.meals.map(meal =>
      meal.items.map(item => this.props.addFood(item.name))
    );
    editedEntry.movement.map(activity => this.props.addMovement(activity.type));
  };
  render() {
    const { entry } = this.props;
    return (
      <div>
        EditEntry.js
        <EntryForm entry={entry} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  entry: state.user.journal.find(entry => entry.id === ownProps.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  addFood: food => dispatch(addFood(food)),
  addMovement: movement => dispatch(addMovement(movement)),
  editEntry: (id, editedEntry) => dispatch(editEntry(id, editedEntry))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntry);
