import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { startAddEntry } from '../redux/actions/journal';
import { addFood, addMovement } from '../redux/actions/logs';

function AddEntry(props) {
  const { addFood, addMovement, history, logs, startAddEntry } = props;

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

  const handleSubmitEntry = entry => {
    startAddEntry(entry);
    handleLogFood(entry);
    handleLogMovement(entry);
    history.push('/');
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
  addFood: food => dispatch(addFood(food)),
  addMovement: movement => dispatch(addMovement(movement))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
