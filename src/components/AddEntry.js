import React from 'react';
import { connect } from 'react-redux';

import EntryForm from './EntryForm';
import { addEntry } from '../redux/actions/journal';
import {
  addAppointment,
  addFood,
  addMovement,
  addPractitioner
} from '../redux/actions/logs';

function AddEntry(props) {
  const {
    addAppointment,
    addEntry,
    addFood,
    addMovement,
    addPractitioner,
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

  const handleSubmitEntry = entry => {
    addEntry(entry);
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
  addAppointment: appointment => dispatch(addAppointment(appointment)),
  addEntry: entry => dispatch(addEntry(entry)),
  addFood: food => dispatch(addFood(food)),
  addMovement: movement => dispatch(addMovement(movement)),
  addPractitioner: practitioner => dispatch(addPractitioner(practitioner))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
