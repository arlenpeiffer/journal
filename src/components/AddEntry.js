import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { startAddEntry } from '../redux/actions/journal';
import {
  startAddAppointment,
  startAddFood,
  startAddMovement,
  startAddPractitioner
} from '../redux/actions/logs';

function AddEntry(props) {
  const {
    history,
    logs,
    startAddAppointment,
    startAddEntry,
    startAddFood,
    startAddMovement,
    startAddPractitioner
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

  const handleSubmitEntry = entry => {
    startAddEntry(entry);
    handleLogAppointment(entry);
    handleLogFood(entry);
    handleLogMovement(entry);
    handleLogPractitioner(entry);
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
  startAddAppointment: appointment =>
    dispatch(startAddAppointment(appointment)),
  startAddEntry: entry => dispatch(startAddEntry(entry)),
  startAddFood: food => dispatch(startAddFood(food)),
  startAddMovement: movement => dispatch(startAddMovement(movement)),
  startAddPractitioner: practitioner =>
    dispatch(startAddPractitioner(practitioner))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
