import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { addEntry } from '../redux/actions/journal';
import { addFood, addMovement } from '../redux/actions/logs';

class AddEntry extends React.Component {
  handleLogFood = entry => {
    const { addFood, logs } = this.props;
    entry.food.meals.map(meal =>
      meal.items.map(food =>
        logs.food.find(logItem => food.name === logItem)
          ? null
          : addFood(food.name)
      )
    );
  };

  handleLogMovement = entry => {
    const { addMovement, logs } = this.props;
    entry.movement.map(movement =>
      logs.movement.find(logItem => movement.type === logItem)
        ? null
        : addMovement(movement.type)
    );
  };

  handleSubmit = entry => {
    this.props.addEntry(entry);
    this.handleLogFood(entry);
    this.handleLogMovement(entry);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        AddEntry.js
        <EntryForm handleSubmitEntry={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.user.logs
});

const mapDispatchToProps = dispatch => ({
  addEntry: entry => dispatch(addEntry(entry)),
  addFood: food => dispatch(addFood(food)),
  addMovement: movement => dispatch(addMovement(movement))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
