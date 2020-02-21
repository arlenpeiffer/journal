import * as actions from '../redux/actions/logs';
import store from '../redux/store';

export const checkIfLogContainsValue = (log, value) => {
  return log.some(logItem => logItem.toLowerCase() === value.toLowerCase());
};

const gather = (array, properties) => {
  const values = array.reduce((values, item) => {
    const property = properties[0];
    const value = item[property];
    const valueIsArray = Array.isArray(value);
    valueIsArray ? values.push(...value) : value && values.push(value);
    return values;
  }, []);

  const isLastProperty = properties.length === 1;
  return isLastProperty ? values : gather(values, properties.slice(1));
};

const filter = (values, log) => {
  return values.filter(value => !checkIfLogContainsValue(log, value));
};

const updateAppointments = (appointments, log) => {
  const valuesInEntry = gather(appointments, ['type']);
  const valuesToLog = filter(valuesInEntry, log);
  updateLog(valuesToLog, actions.addAppointment);
};

const updateIngredients = (meals, log) => {
  const ingredientsInEntry = gather(meals, ['items', 'ingredients']);
  const ingredientsToLog = filter(ingredientsInEntry, log);
  updateLog(ingredientsToLog, actions.addIngredient);
};

const updateMealItems = (meals, log) => {
  const mealItemsInEntry = gather(meals, ['items', 'name']);
  const mealItemsToLog = filter(mealItemsInEntry, log);
  updateLog(mealItemsToLog, actions.addMeal);
};

const updateMovements = (movements, log) => {
  const movementsInEntry = gather(movements, ['type']);
  const movementsToLog = filter(movementsInEntry, log);
  updateLog(movementsToLog, actions.addMovement);
};

const updatePractitioners = (appointments, log) => {
  const practitionersInEntry = gather(appointments, ['practitioner']);
  const practitionersToLog = filter(practitionersInEntry, log);
  updateLog(practitionersToLog, actions.addPractitioner);
};

const updateLog = (valuesToLog, action) => {
  const { dispatch } = store;
  const dispatchActionForEachValue = valuesToLog.map(value =>
    dispatch(action(value))
  );
  return valuesToLog && dispatchActionForEachValue;
};

export const updateLogs = entry => {
  const { logs } = store.getState().user;
  updateAppointments(entry.appointments, logs.appointments);
  updateIngredients(entry.food.meals, logs.ingredients);
  updateMealItems(entry.food.meals, logs.meals);
  updateMovements(entry.movement, logs.movement);
  updatePractitioners(entry.appointments, logs.practitioners);
};
