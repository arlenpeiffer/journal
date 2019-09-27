import {
  ADD_APPOINTMENT,
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_PRACTITIONER,
  ADD_SUPPLEMENT,
  GET_LOGS,
  REMOVE_SUPPLEMENT
} from '../actions';
import { database } from '../../firebase';
import Appointments from '../../components/Appointments';

export const addAppointment = appointment => {
  return {
    type: ADD_APPOINTMENT,
    payload: { appointment }
  };
};

export const startAddAppointment = appointment => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
    database
      .ref(`users/${userId}/logs/appointments`)
      .push(appointment)
      .then(dispatch(addAppointment(appointment)));
  };
};

export const addFood = food => {
  return {
    type: ADD_FOOD,
    payload: { food }
  };
};

export const startAddFood = food => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
    database
      .ref(`users/${userId}/logs/food`)
      .push(food)
      .then(dispatch(addFood(food)));
  };
};

export const addMovement = movement => {
  return {
    type: ADD_MOVEMENT,
    payload: { movement }
  };
};

export const startAddMovement = movement => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
    database
      .ref(`users/${userId}/logs/movement`)
      .push(movement)
      .then(dispatch(addMovement(movement)));
  };
};

export const addNsaid = nsaid => {
  return {
    type: ADD_NSAID,
    payload: { nsaid }
  };
};

export const addPractitioner = practitioner => {
  return {
    type: ADD_PRACTITIONER,
    payload: { practitioner }
  };
};

export const startAddPractitioner = practitioner => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
    database
      .ref(`users/${userId}/logs/practitioners`)
      .push(practitioner)
      .then(dispatch(addPractitioner(practitioner)));
  };
};

export const addSupplement = supplement => {
  return {
    type: ADD_SUPPLEMENT,
    payload: { supplement }
  };
};

export const startAddSupplement = supplement => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
    database
      .ref(`users/${userId}/logs/supplements`)
      .push(supplement)
      .then(dispatch(addSupplement(supplement)));
  };
};

export const getLogs = logs => {
  return {
    type: GET_LOGS,
    payload: { logs }
  };
};

export const startGetLogs = () => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
    database
      .ref(`users/${userId}/logs`)
      .once('value')
      .then(snapshot => {
        let appointments = [];
        snapshot.child('appointments').forEach(childSnapshot => {
          appointments.push(childSnapshot.val());
        });
        let food = [];
        snapshot.child('food').forEach(childSnapshot => {
          food.push(childSnapshot.val());
        });
        let movement = [];
        snapshot.child('movement').forEach(childSnapshot => {
          movement.push(childSnapshot.val());
        });
        let nsaid = [];
        snapshot.child('nsaid').forEach(childSnapshot => {
          nsaid.push(childSnapshot.val());
        });
        let practitioners = [];
        snapshot.child('practitioners').forEach(childSnapshot => {
          practitioners.push(childSnapshot.val());
        });
        let supplements = [];
        snapshot.child('supplements').forEach(childSnapshot => {
          supplements.push(childSnapshot.val());
        });
        dispatch(
          getLogs({
            appointments,
            food,
            movement,
            nsaid,
            practitioners,
            supplements
          })
        );
      });
  };
};

export const removeSupplement = supplement => {
  return {
    type: REMOVE_SUPPLEMENT,
    payload: { supplement }
  };
};

export const startRemoveSupplement = supplement => {
  return (dispatch, getState) => {
    const userId = getState().user.userInfo.id;
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
