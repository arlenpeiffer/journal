import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { startAddEntry } from '../redux/actions/journal';
import { startAddFood, startAddMovement } from '../redux/actions/logs';

function AddEntry(props) {
  const {
    history,
    logs,
    startAddEntry,
    startAddFood,
    startAddMovement
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

  const handleSubmitEntry = entry => {
    startAddEntry(entry);
    handleLogFood(entry);
    handleLogMovement(entry);
    history.push('/view');
  };

  return (
    <div>
      AddEntry.js
      <EntryForm handleSubmitEntry={handleSubmitEntry} />
    </div>
  );
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

const mapDispatchToProps = dispatch => ({
  startAddEntry: entry => dispatch(startAddEntry(entry)),
  startAddFood: food => dispatch(startAddFood(food)),
  startAddMovement: movement => dispatch(startAddMovement(movement))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
