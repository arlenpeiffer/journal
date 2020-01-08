import * as types from '../actions';
import { firebase } from '../../firebase';
import { sortLog } from '../../utils';

// ADD_APPOINTMENT //
const addAppointmentRequest = () => {
  return {
    type: types.ADD_APPOINTMENT_REQUEST
  };
};

const addAppointmentSuccess = appointment => {
  return {
    type: types.ADD_APPOINTMENT_SUCCESS,
    payload: { appointment }
  };
};

const addAppointmentFailure = error => {
  return {
    type: types.ADD_APPOINTMENT_FAILURE,
    payload: { error }
  };
};

export const addAppointment = appointment => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addAppointmentRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/appointments`)
      .push(appointment)
      .then(dispatch(addAppointmentSuccess(appointment)))
      .catch(error => dispatch(addAppointmentFailure(error)));
  };
};

// ADD_DIET //
const addDietRequest = () => {
  return {
    type: types.ADD_DIET_REQUEST
  };
};

const addDietSuccess = diet => {
  return {
    type: types.ADD_DIET_SUCCESS,
    payload: { diet }
  };
};

const addDietFailure = error => {
  return {
    type: types.ADD_DIET_FAILURE,
    payload: { error }
  };
};

export const addDiet = diet => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addDietRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/diets`)
      .push(diet)
      .then(dispatch(addDietSuccess(diet)))
      .catch(error => dispatch(addDietFailure(error)));
  };
};

// ADD_FOOD //
const addFoodRequest = () => {
  return {
    type: types.ADD_FOOD_REQUEST
  };
};

const addFoodSuccess = food => {
  return {
    type: types.ADD_FOOD_SUCCESS,
    payload: { food }
  };
};

const addFoodFailure = error => {
  return {
    type: types.ADD_FOOD_FAILURE,
    payload: { error }
  };
};

export const addFood = food => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addFoodRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/food`)
      .push(food)
      .then(dispatch(addFoodSuccess(food)))
      .catch(error => dispatch(addFoodFailure(error)));
  };
};

// ADD_INGREDIENT //
const addIngredientRequest = () => {
  return {
    type: types.ADD_INGREDIENT_REQUEST
  };
};

const addIngredientSuccess = ingredient => {
  return {
    type: types.ADD_INGREDIENT_SUCCESS,
    payload: { ingredient }
  };
};

const addIngredientFailure = error => {
  return {
    type: types.ADD_INGREDIENT_FAILURE,
    payload: { error }
  };
};

export const addIngredient = ingredient => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addIngredientRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/ingredients`)
      .push(ingredient)
      .then(dispatch(addIngredientSuccess(ingredient)))
      .catch(error => dispatch(addIngredientFailure(error)));
  };
};

// ADD_MEAL //
const addMealRequest = () => {
  return {
    type: types.ADD_MEAL_REQUEST
  };
};

const addMealSuccess = meal => {
  return {
    type: types.ADD_MEAL_SUCCESS,
    payload: { meal }
  };
};

const addMealFailure = error => {
  return {
    type: types.ADD_MEAL_FAILURE,
    payload: { error }
  };
};

export const addMeal = meal => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addMealRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/meals`)
      .push(meal)
      .then(dispatch(addMealSuccess(meal)))
      .catch(error => dispatch(addMealFailure(error)));
  };
};

// ADD_MEDICATION //
const addMedicationRequest = () => {
  return {
    type: types.ADD_MEDICATION_REQUEST
  };
};

const addMedicationSuccess = medication => {
  return {
    type: types.ADD_MEDICATION_SUCCESS,
    payload: { medication }
  };
};

const addMedicationFailure = error => {
  return {
    type: types.ADD_MEDICATION_FAILURE,
    payload: { error }
  };
};

export const addMedication = medication => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addMedicationRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/medications`)
      .push(medication)
      .then(dispatch(addMedicationSuccess(medication)))
      .catch(error => dispatch(addMedicationFailure(error)));
  };
};

// ADD_MOOD //
const addMoodRequest = () => {
  return {
    type: types.ADD_MOOD_REQUEST
  };
};

const addMoodSuccess = mood => {
  return {
    type: types.ADD_MOOD_SUCCESS,
    payload: { mood }
  };
};

const addMoodFailure = error => {
  return {
    type: types.ADD_MOOD_FAILURE,
    payload: { error }
  };
};

export const addMood = mood => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addMoodRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/moods`)
      .push(mood)
      .then(dispatch(addMoodSuccess(mood)))
      .catch(error => dispatch(addMoodFailure(error)));
  };
};

// ADD_MOVEMENT //
const addMovementRequest = () => {
  return {
    type: types.ADD_MOVEMENT_REQUEST
  };
};

const addMovementSuccess = movement => {
  return {
    type: types.ADD_MOVEMENT_SUCCESS,
    payload: { movement }
  };
};

const addMovementFailure = error => {
  return {
    type: types.ADD_MOVEMENT_FAILURE,
    payload: { error }
  };
};

export const addMovement = movement => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addMovementRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/movement`) // change to movements
      .push(movement)
      .then(dispatch(addMovementSuccess(movement)))
      .catch(error => dispatch(addMovementFailure(error)));
  };
};

// ADD_PRACTITIONER //
const addPractitionerRequest = () => {
  return {
    type: types.ADD_PRACTITIONER_REQUEST
  };
};

const addPractitionerSuccess = practitioner => {
  return {
    type: types.ADD_PRACTITIONER_SUCCESS,
    payload: { practitioner }
  };
};

const addPractitionerFailure = error => {
  return {
    type: types.ADD_PRACTITIONER_FAILURE,
    payload: { error }
  };
};

export const addPractitioner = practitioner => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addPractitionerRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/practitioners`)
      .push(practitioner)
      .then(dispatch(addPractitionerSuccess(practitioner)))
      .catch(error => dispatch(addPractitionerFailure(error)));
  };
};

// ADD_SUPPLEMENT //
const addSupplementRequest = () => {
  return {
    type: types.ADD_SUPPLEMENT_REQUEST
  };
};

const addSupplementSuccess = supplement => {
  return {
    type: types.ADD_SUPPLEMENT_SUCCESS,
    payload: { supplement }
  };
};

const addSupplementFailure = error => {
  return {
    type: types.ADD_SUPPLEMENT_FAILURE,
    payload: { error }
  };
};

export const addSupplement = supplement => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addSupplementRequest());
    firebase
      .database()
      .ref(`users/${userId}/logs/supplements`)
      .push(supplement)
      .then(dispatch(addSupplementSuccess(supplement)))
      .catch(error => dispatch(addSupplementFailure(error)));
  };
};

// GET_LOGS //
const getLogsRequest = () => {
  return {
    type: types.GET_LOGS_REQUEST
  };
};

const getLogsSuccess = logs => {
  return {
    type: types.GET_LOGS_SUCCESS,
    payload: { logs }
  };
};

const getLogsFailure = error => {
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
        const generateLog = logName => {
          const log = [];
          snapshot.child(`${logName}`).forEach(childSnapshot => {
            log.push(childSnapshot.val());
          });
          return sortLog(log);
        };

        dispatch(
          getLogsSuccess({
            appointments: generateLog('appointments'),
            diets: generateLog('diets'),
            food: generateLog('food'),
            ingredients: generateLog('ingredients'),
            meals: generateLog('meals'),
            medications: generateLog('medications'),
            moods: generateLog('moods'),
            movement: generateLog('movement'),
            practitioners: generateLog('practitioners'),
            supplements: generateLog('supplements')
          })
        );
      })
      .catch(error => dispatch(getLogsFailure(error)));
  };
};

// REMOVE_SUPPLEMENT //
const removeSupplementRequest = () => {
  return {
    type: types.REMOVE_SUPPLEMENT_REQUEST
  };
};

const removeSupplementSuccess = supplement => {
  return {
    type: types.REMOVE_SUPPLEMENT_SUCCESS,
    payload: { supplement }
  };
};

const removeSupplementFailure = error => {
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
