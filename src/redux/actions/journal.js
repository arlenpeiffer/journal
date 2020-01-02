import * as types from '../actions';
import { firebase } from '../../firebase';

// ADD_ENTRY //
export const addEntryRequest = () => {
  return {
    type: types.ADD_ENTRY_REQUEST
  };
};

export const addEntrySuccess = entry => {
  return {
    type: types.ADD_ENTRY_SUCCESS,
    payload: { entry }
  };
};

export const addEntryFailure = error => {
  return {
    type: types.ADD_ENTRY_FAILURE,
    payload: { error }
  };
};

export const addEntry = entry => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(addEntryRequest());
    firebase
      .database()
      .ref(`users/${userId}/journal`)
      .push(entry)
      .then(ref => {
        dispatch(
          addEntrySuccess({
            ...entry,
            id: ref.key
          })
        );
      })
      .catch(error => dispatch(addEntryFailure(error)));
  };
};

// EDIT_ENTRY //
export const editEntryRequest = () => {
  return {
    type: types.EDIT_ENTRY_REQUEST
  };
};

export const editEntrySuccess = (editedEntry, id) => {
  return {
    type: types.EDIT_ENTRY_SUCCESS,
    payload: { editedEntry, id }
  };
};

export const editEntryFailure = error => {
  return {
    type: types.EDIT_ENTRY_FAILURE,
    payload: { error }
  };
};

export const editEntry = (editedEntry, id) => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(editEntryRequest());
    firebase
      .database()
      .ref(`users/${userId}/journal/${id}`)
      .update({
        ...editedEntry,
        id: null
      })
      .then(() => {
        dispatch(editEntrySuccess(editedEntry, id));
      })
      .catch(error => dispatch(editEntryFailure(error)));
  };
};

// GET_JOURNAL //
export const getJournalRequest = () => {
  return {
    type: types.GET_JOURNAL_REQUEST
  };
};

export const getJournalSuccess = journal => {
  return {
    type: types.GET_JOURNAL_SUCCESS,
    payload: { journal }
  };
};

export const getJournalFailure = error => {
  return {
    type: types.GET_JOURNAL_FAILURE,
    payload: { error }
  };
};

export const getJournal = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(getJournalRequest());
    firebase
      .database()
      .ref(`users/${userId}/journal`)
      .once('value')
      .then(snapshot => {
        const journal = [];
        snapshot.forEach(childSnapshot => {
          journal.push({
            appointments: childSnapshot.val().appointments || [],
            date: childSnapshot.val().date,
            food: {
              diet: childSnapshot.val().food.diet,
              meals: childSnapshot.val().food.meals || []
            },
            id: childSnapshot.key,
            mood: childSnapshot.val().mood || [],
            movement: childSnapshot.val().movement || [],
            notes: childSnapshot.val().notes,
            pain: childSnapshot.val().pain,
            sleep: childSnapshot.val().sleep,
            stomach: childSnapshot.val().stomach,
            stress: childSnapshot.val().stress,
            supplements: childSnapshot.val().supplements || [],
            travel: childSnapshot.val().travel
          });
        });
        dispatch(getJournalSuccess(journal));
      })
      .catch(error => dispatch(getJournalFailure(error)));
  };
};

// REMOVE_ENTRY //
export const removeEntryRequest = () => {
  return {
    type: types.REMOVE_ENTRY_REQUEST
  };
};

export const removeEntrySuccess = id => {
  return {
    type: types.REMOVE_ENTRY_SUCCESS,
    payload: { id }
  };
};

export const removeEntryFailure = error => {
  return {
    type: types.REMOVE_ENTRY_FAILURE,
    payload: { error }
  };
};

export const removeEntry = id => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(removeEntryRequest());
    firebase
      .database()
      .ref(`users/${userId}/journal/${id}`)
      .remove()
      .then(() => {
        dispatch(removeEntrySuccess(id));
      })
      .catch(error => dispatch(removeEntryFailure(error)));
  };
};
