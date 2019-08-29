import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { startEditEntry } from '../redux/actions/journal';
import { startAddFood, startAddMovement } from '../redux/actions/logs';

function EditEntry(props) {
  const {
    entry,
    history,
    logs,
    startAddFood,
    startAddMovement,
    startEditEntry
  } = props;

  const handleLogFood = entry => {
    entry.food.meals.map(meal =>
      meal.items.map(food =>
        logs.food.find(logItem => food.name === logItem)
          ? null
          : startAddFood(food.name)
      )
    );
  };

  const handleLogMovement = entry => {
    entry.movement.map(movement =>
      logs.movement.find(logItem => movement.type === logItem)
        ? null
        : startAddMovement(movement.type)
    );
  };

  const handleSubmitEntry = editedEntry => {
    const { id } = entry;
    startEditEntry(editedEntry, id);
    handleLogFood(editedEntry);
    handleLogMovement(editedEntry);
    history.push('/view');
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
  startAddFood: food => dispatch(startAddFood(food)),
  startAddMovement: movement => dispatch(startAddMovement(movement)),
  startEditEntry: (editedEntry, id) => dispatch(startEditEntry(editedEntry, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntry);
