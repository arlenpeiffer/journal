import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { startEditEntry } from '../redux/actions/journal';
import {
  startAddAppointment,
  startAddFood,
  startAddMovement,
  startAddPractitioner
} from '../redux/actions/logs';

function EditEntry(props) {
  const {
    entry,
    history,
    logs,
    startAddAppointment,
    startAddFood,
    startAddMovement,
    startAddPractitioner,
    startEditEntry
  } = props;

  const handleLogAppointment = entry => {
    entry.appointments.map(appointment =>
      logs.appointments.find(logItem => appointment.type === logItem)
        ? null
        : startAddAppointment(appointment.type)
    );
  };

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

  const handleLogPractitioner = entry => {
    entry.appointments.map(appointment =>
      logs.practitioners.find(logItem => appointment.practitioner === logItem)
        ? null
        : startAddPractitioner(appointment.practitioner)
    );
  };

  const handleSubmitEntry = editedEntry => {
    const { id } = entry;
    startEditEntry(editedEntry, id);
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
  startAddAppointment: appointment =>
    dispatch(startAddAppointment(appointment)),
  startAddFood: food => dispatch(startAddFood(food)),
  startAddMovement: movement => dispatch(startAddMovement(movement)),
  startAddPractitioner: practitioner =>
    dispatch(startAddPractitioner(practitioner)),
  startEditEntry: (editedEntry, id) => dispatch(startEditEntry(editedEntry, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEntry);
