import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { editEntry } from '../redux/actions/journal';
import { addFood, addMovement } from '../redux/actions/logs';

function EditEntry(props) {
  const { addFood, addMovement, editEntry, entry, history, logs } = props;

  const handleLogFood = entry => {
    entry.food.meals.map(meal =>
      meal.items.map(food =>
        logs.food.find(logItem => food.name === logItem)
          ? null
          : addFood(food.name)
      )
    );
  };

  const handleLogMovement = entry => {
    entry.movement.map(movement =>
      logs.movement.find(logItem => movement.type === logItem)
        ? null
        : addMovement(movement.type)
    );
  };

  const handleSubmitEntry = editedEntry => {
    const { id } = entry;
    editEntry(id, editedEntry);
    handleLogFood(editedEntry);
    handleLogMovement(editedEntry);
    history.push('/');
  };

  return (
    <div>
      EditEntry.js
      <EntryForm entry={entry} handleSubmitEntry={handleSubmitEntry} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  entry: state.user.journal.find(
    entry => entry.id === ownProps.match.params.id
  ),
  logs: state.user.logs
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
