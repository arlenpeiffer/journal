import * as actions from '../redux/actions/logs';
import store from '../redux/store';

// ----- LOGS ----- //
export const checkIfLogContainsValue = (log, value) => {
  return log.some(logItem => logItem.toLowerCase() === value.toLowerCase());
};

export const determineValuesToLog = (entrySection, sectionProperty, log) => {
  const valuesToLog = [];
  entrySection.map(sectionItem => {
    const value = sectionProperty ? sectionItem[sectionProperty] : sectionItem;
    const logContainsValue = checkIfLogContainsValue(log, value);
    return logContainsValue ? null : valuesToLog.push(value);
  });
  return valuesToLog;
};

export const handleLogValues = (values, thunk) => {
  const { dispatch } = store;
  const shouldUpdate = values.length > 0;
  shouldUpdate && values.map(value => dispatch(thunk(value)));
};

export const updateLogs = (entry, logs) => {
  const appointments = determineValuesToLog(
    entry.appointments,
    'type',
    logs.appointments
  );
  handleLogValues(appointments, actions.addAppointment);

  // const food = [];
  // entry.food.meals.map(meal => {
  //   const items = determineValuesToLog(meal.items, 'name', logs.food);
  //   food.push(...items);
  // });
  // logValues(food, actions.addFood);

  const ingredients = [];
  entry.food.meals.map(meal => {
    meal.items.map(item => {
      ingredients.push(
        ...determineValuesToLog(item.ingredients, null, logs.ingredients)
      );
    });
  });
  handleLogValues(ingredients, actions.addIngredient);

  const meals = [];
  entry.food.meals.map(meal => {
    const items = determineValuesToLog(meal.items, 'name', logs.food);
    meals.push(...items);
  });
  handleLogValues(meals, actions.addMeal);

  const movement = determineValuesToLog(entry.movement, 'type', logs.movement);
  handleLogValues(movement, actions.addMovement);

  const practitioners = determineValuesToLog(
    entry.appointments,
    'practitioner',
    logs.practitioners
  );
  handleLogValues(practitioners, actions.addPractitioner);
};
