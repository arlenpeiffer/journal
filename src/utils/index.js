import reduce from 'lodash.reduce';
import sortBy from 'lodash.sortby';
import trim from 'lodash.trim';

export const formatLevel = level => {
  switch (level) {
    case 0:
      return 'None';
    case 1:
      return 'Low';
    case 2:
      return 'Moderate';
    case 3:
      return 'High';
    case 4:
      return 'Extreme';
    default:
      return;
  }
};

export const formatMealType = type => {
  switch (type) {
    case 0:
      return 'Breakfast';
    case 1:
      return 'Lunch';
    case 2:
      return 'Snack';
    case 3:
      return 'Dinner';
    case 4:
      return 'Dessert';
    default:
      return;
  }
};

export const formatSleepAmount = value => {
  const numberOfHours = Math.floor(value);
  const numberOfMinutes = (value - numberOfHours) * 60;
  const s = numberOfHours > 1 ? 's' : '';
  const hours = numberOfHours ? `${numberOfHours} hr${s}` : '';
  const minutes = `${numberOfMinutes} mins`;
  return `${hours} ${minutes}`;
};

export const getErrorMessage = error => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return `Uh oh, looks like there's already an account registered with that email address.`;
    case 'auth/invalid-email':
      return `Hmm, that doesn't seem to be a valid email address. Please try again.`;
    case 'auth/operation-not-allowed':
      return `Uh oh, looks like that's not allowed.`;
    case 'auth/user-disabled':
      return `Uh oh, looks like that account is currently disabled for some reason.`;
    case 'auth/user-not-found':
      return `Hmm, there doesn't appear to be an account associated with that email address.`;
    case 'auth/weak-password':
      return `Uh oh, the password you entered has been deemed too weak. Please try entering a new one.`;
    case 'auth/wrong-password':
      return `Hmm, that doesn't seem to be the correct password. Please try again.`;
    default:
      return `Uh oh, looks like we've got an error of some sort.`;
  }
};

export const trimValues = (object, container) =>
  reduce(
    object,
    function(acc, value, key) {
      typeof value === 'object'
        ? Array.isArray(value)
          ? value.some(item => typeof item === 'object')
            ? (acc[key] = trimValues(value, []))
            : (acc[key] = value)
          : (acc[key] = trimValues(value, {}))
        : typeof value === 'string'
        ? (acc[key] = trim(value))
        : (acc[key] = value);
      return acc;
    },
    container
  );

// ----- LOGS ----- //
export const checkIfLogContainsValue = (log, value) => {
  return log.some(logItem => logItem.toLowerCase() === value.toLowerCase());
};

export const determineValuesToLog = (entrySection, sectionProperty, log) => {
  const valuesToLog = [];
  entrySection.map(sectionItem => {
    return checkIfLogContainsValue(log, sectionItem[sectionProperty])
      ? null
      : valuesToLog.push(sectionItem[sectionProperty]);
  });
  return valuesToLog;
};

export const logValues = (values, thunk) => {
  return values.map(value => thunk(value));
};

export const sortLog = log => {
  return sortBy(log, [logItem => logItem.toLowerCase()]);
};
