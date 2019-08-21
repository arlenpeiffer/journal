import {
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  GET_LOGS,
  REMOVE_SUPPLEMENT
} from '../actions';
import { database } from '../../firebase/firebase';

export const addFood = food => {
  return {
    type: ADD_FOOD,
    payload: { food }
  };
};

export const startAddFood = food => {
  return dispatch => {
    database
      .ref('user/callie/logs/food')
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
  return dispatch => {
    database
      .ref('user/callie/logs/movement')
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

export const addSupplement = supplement => {
  return {
    type: ADD_SUPPLEMENT,
    payload: { supplement }
  };
};

export const startAddSupplement = supplement => {
  return dispatch => {
    database
      .ref('user/callie/logs/supplements')
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
  return dispatch => {
    database
      .ref('user/callie/logs')
      .once('value')
      .then(snapshot => {
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
        let supplements = [];
        snapshot.child('supplements').forEach(childSnapshot => {
          supplements.push(childSnapshot.val());
        });
        dispatch(
          getLogs({
            food,
            movement,
            nsaid,
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
  return dispatch => {
    database
      .ref('user/callie/logs/supplements')
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.val() === supplement) {
            return database
              .ref(`user/callie/logs/supplements/${childSnapshot.key}`)
              .remove()
              .then(dispatch(removeSupplement(supplement)));
          }
        });
      });
  };
};
