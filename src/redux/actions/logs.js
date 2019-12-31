import * as types from '../actions';
import { firebase } from '../../firebase';
import sortby from 'lodash.sortby';
import { setupAddToLogFunction, setupCallbacksObject } from '../../utils';

// ADD_APPOINTMENT //
export const addAppointmentRequest = () => {
  return {
    type: types.ADD_APPOINTMENT_REQUEST
  };
};

export const addAppointmentSuccess = appointment => {
  return {
    type: types.ADD_APPOINTMENT_SUCCESS,
    payload: { appointment }
  };
};

export const addAppointmentFailure = error => {
  return {
    type: types.ADD_APPOINTMENT_FAILURE,
    payload: { error }
  };
};

export const addAppointment = appointment => {
  const callbacks = setupCallbacksObject(
    addAppointmentRequest,
    addAppointmentSuccess,
    addAppointmentFailure
  );

  return setupAddToLogFunction(appointment, 'appointments', callbacks);
};

// ADD_FOOD //
export const addFoodRequest = () => {
  return {
    type: types.ADD_FOOD_REQUEST
  };
};

export const addFoodSuccess = food => {
  return {
    type: types.ADD_FOOD_SUCCESS,
    payload: { food }
  };
};

export const addFoodFailure = error => {
  return {
    type: types.ADD_FOOD_FAILURE,
    payload: { error }
  };
};

export const addFood = food => {
  const callbacks = setupCallbacksObject(
    addFoodRequest,
    addFoodSuccess,
    addFoodFailure
  );

  return setupAddToLogFunction(food, 'food', callbacks);
};

// ADD_MOVEMENT //
export const addMovementRequest = () => {
  return {
    type: types.ADD_MOVEMENT_REQUEST
  };
};

export const addMovementSuccess = movement => {
  return {
    type: types.ADD_MOVEMENT_SUCCESS,
    payload: { movement }
  };
};

export const addMovementFailure = error => {
  return {
    type: types.ADD_MOVEMENT_FAILURE,
    payload: { error }
  };
};

export const addMovement = movement => {
  const callbacks = setupCallbacksObject(
    addMovementRequest,
    addMovementSuccess,
    addMovementFailure
  );

  return setupAddToLogFunction(movement, 'movement', callbacks);
};

// ADD_NSAID //
export const addNsaidRequest = () => {
  return {
    type: types.ADD_NSAID_REQUEST
  };
};

export const addNsaidSuccess = nsaid => {
  return {
    type: types.ADD_NSAID_SUCCESS,
    payload: { nsaid }
  };
};

export const addNsaidFailure = error => {
  return {
    type: types.ADD_NSAID_FAILURE,
    payload: { error }
  };
};

// ADD_PRACTITIONER //
export const addPractitionerRequest = () => {
  return {
    type: types.ADD_PRACTITIONER_REQUEST
  };
};

export const addPractitionerSuccess = practitioner => {
  return {
    type: types.ADD_PRACTITIONER_SUCCESS,
    payload: { practitioner }
  };
};

export const addPractitionerFailure = error => {
  return {
    type: types.ADD_PRACTITIONER_FAILURE,
    payload: { error }
  };
};

export const addPractitioner = practitioner => {
  const callbacks = setupCallbacksObject(
    addPractitionerRequest,
    addPractitionerSuccess,
    addPractitionerFailure
  );

  return setupAddToLogFunction(practitioner, 'practitioners', callbacks);
};

// ADD_SUPPLEMENT //
export const addSupplementRequest = () => {
  return {
    type: types.ADD_SUPPLEMENT_REQUEST
  };
};

export const addSupplementSuccess = supplement => {
  return {
    type: types.ADD_SUPPLEMENT_SUCCESS,
    payload: { supplement }
  };
};

export const addSupplementFailure = error => {
  return {
    type: types.ADD_SUPPLEMENT_FAILURE,
    payload: { error }
  };
};

export const addSupplement = supplement => {
  const callbacks = setupCallbacksObject(
    addSupplementRequest,
    addSupplementSuccess,
    addSupplementFailure
  );

  return setupAddToLogFunction(supplement, 'supplements', callbacks);
};

// GET_LOGS //
export const getLogsRequest = () => {
  return {
    type: types.GET_LOGS_REQUEST
  };
};

export const getLogsSuccess = logs => {
  return {
    type: types.GET_LOGS_SUCCESS,
    payload: { logs }
  };
};

export const getLogsFailure = error => {
  return {
    type: types.GET_LOGS_FAILURE,
    payload: { error }
  };
};

export const getLogs = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(getLogsRequest());
    firebase
      .database()
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
          getLogsSuccess({
            appointments: generateLog('appointments'),
            food: generateLog('food'),
            movement: generateLog('movement'),
            nsaid: generateLog('nsaid'),
            practitioners: generateLog('practitioners'),
            supplements: generateLog('supplements')
          })
        );
      })
      .catch(error => dispatch(getLogsFailure(error)));
  };
};

// REMOVE_SUPPLEMENT //
export const removeSupplementRequest = () => {
  return {
    type: types.REMOVE_SUPPLEMENT_REQUEST
  };
};

export const removeSupplementSuccess = supplement => {
  return {
    type: types.REMOVE_SUPPLEMENT_SUCCESS,
    payload: { supplement }
  };
};

export const removeSupplementFailure = error => {
  return {
    type: types.REMOVE_SUPPLEMENT_FAILURE,
    payload: { error }
  };
};

export const removeSupplement = supplement => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(removeSupplementRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/supplements`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.val() === supplement) {
            return firebase
              .database()
              .ref(`users/${userId}/logs/supplements/${childSnapshot.key}`)
              .remove()
              .then(dispatch(removeSupplementSuccess(supplement)));
          }
        });
      })
      .catch(error => dispatch(removeSupplementFailure(error)));
  };
};
