import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { editEntry } from '../redux/actions/journal';
import { addFood, addMovement } from '../redux/actions/logs';

class EditEntry extends React.Component {
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

  handleSubmit = editedEntry => {
    const { id } = this.props.entry;
    this.props.editEntry(id, editedEntry);
    this.handleLogFood(editedEntry);
    this.handleLogMovement(editedEntry);
    this.props.history.push('/');
  };

  render() {
    const { entry } = this.props;
    return (
      <div>
        EditEntry.js
        <EntryForm entry={entry} handleSubmitEntry={this.handleSubmit} />
      </div>
    );
  }
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
