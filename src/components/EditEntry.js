import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { editEntry } from '../redux/actions/journal';
import {
  addAppointment,
  addFood,
  addMovement,
  addPractitioner
} from '../redux/actions/logs';

function EditEntry(props) {
  const {
    addAppointment,
    addFood,
    addMovement,
    addPractitioner,
    editEntry,
    entry,
    history,
    logs
  } = props;

  const handleLogAppointment = entry => {
    entry.appointments.map(appointment =>
      logs.appointments.find(logItem => appointment.type === logItem)
        ? null
        : addAppointment(appointment.type)
    );
  };

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

  const handleLogPractitioner = entry => {
    entry.appointments.map(appointment =>
      logs.practitioners.find(logItem => appointment.practitioner === logItem)
        ? null
        : addPractitioner(appointment.practitioner)
    );
  };

  const handleSubmitEntry = editedEntry => {
    const { id } = entry;
    editEntry(editedEntry, id);
    handleLogAppointment(editedEntry);
    handleLogFood(editedEntry);
    handleLogMovement(editedEntry);
    handleLogPractitioner(editedEntry);
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
  addAppointment: appointment => dispatch(addAppointment(appointment)),
  addFood: food => dispatch(addFood(food)),
  addMovement: movement => dispatch(addMovement(movement)),
  addPractitioner: practitioner => dispatch(addPractitioner(practitioner)),
  editEntry: (editedEntry, id) => dispatch(editEntry(editedEntry, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntry);
