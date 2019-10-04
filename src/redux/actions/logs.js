import * as types from '../actions';
import { database } from '../../firebase';
import sortby from 'lodash.sortby';

export const addAppointment = appointment => {
  return {
    type: types.ADD_APPOINTMENT,
    payload: { appointment }
  };
};

export const startAddAppointment = appointment => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/logs/appointments`)
      .push(appointment)
      .then(dispatch(addAppointment(appointment)));
  };
};

export const addFood = food => {
  return {
    type: types.ADD_FOOD,
    payload: { food }
  };
};

export const startAddFood = food => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/logs/food`)
      .push(food)
      .then(dispatch(addFood(food)));
  };
};

export const addMovement = movement => {
  return {
    type: types.ADD_MOVEMENT,
    payload: { movement }
  };
};

export const startAddMovement = movement => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/logs/movement`)
      .push(movement)
      .then(dispatch(addMovement(movement)));
  };
};

export const addNsaid = nsaid => {
  return {
    type: types.ADD_NSAID,
    payload: { nsaid }
  };
};

export const addPractitioner = practitioner => {
  return {
    type: types.ADD_PRACTITIONER,
    payload: { practitioner }
  };
};

export const startAddPractitioner = practitioner => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/logs/practitioners`)
      .push(practitioner)
      .then(dispatch(addPractitioner(practitioner)));
  };
};

export const addSupplement = supplement => {
  return {
    type: types.ADD_SUPPLEMENT,
    payload: { supplement }
  };
};

export const startAddSupplement = supplement => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/logs/supplements`)
      .push(supplement)
      .then(dispatch(addSupplement(supplement)));
  };
};

export const requestLogs = () => {
  return {
    type: types.REQUEST_LOGS
  };
};

export const requestLogsFailure = error => {
  return {
    type: types.REQUEST_LOGS_FAILURE,
    payload: { error }
  };
};

export const requestLogsSuccess = logs => {
  return {
    type: types.REQUEST_LOGS_SUCCESS,
    payload: { logs }
  };
};

export const startGetLogs = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(requestLogs());
    database
      .ref(`users/${userId}/logs`)
      .once('value')
      .then(snapshot => {
        function generateLog(logName) {
          let log = [];
          snapshot.child(`${logName}`).forEach(childSnapshot => {
            log.push(childSnapshot.val());
          });
          return sortby(log, [logItem => logItem.toLowerCase()]);
        }
        dispatch(
          requestLogsSuccess({
            appointments: generateLog('appointments'),
            food: generateLog('food'),
            movement: generateLog('movement'),
            nsaid: generateLog('nsaid'),
            practitioners: generateLog('practitioners'),
            supplements: generateLog('supplements')
          })
        );
      });
  };
};

export const removeSupplement = supplement => {
  return {
    type: types.REMOVE_SUPPLEMENT,
    payload: { supplement }
  };
};

export const startRemoveSupplement = supplement => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/logs/supplements`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.val() === supplement) {
            return database
              .ref(`users/${userId}/logs/supplements/${childSnapshot.key}`)
              .remove()
              .then(dispatch(removeSupplement(supplement)));
          }
        });
      });
  };
};
