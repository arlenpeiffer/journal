import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { addEntry } from '../redux/actions/journal';
import { addFood, addMovement } from '../redux/actions/logs';

class AddEntry extends React.Component {
  onSubmit = entry => {
    this.props.addEntry(entry);
    this.props.history.push('/');
    entry.food.meals.map(meal =>
      meal.items.map(item => this.props.addFood(item.name))
    );
    entry.movement.map(activity => this.props.addMovement(activity.type));
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
  addEntry: entry => dispatch(addEntry(entry)),
  addFood: food => dispatch(addFood(food)),
  addMovement: movement => dispatch(addMovement(movement))
});

export default connect(
  null,
  mapDispatchToProps
)(AddEntry);
