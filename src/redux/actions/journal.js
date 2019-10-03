import {
  ADD_ENTRY,
  CLEAR_JOURNAL,
  EDIT_ENTRY,
  GET_JOURNAL,
  REMOVE_ENTRY
} from '../actions';
import { database } from '../../firebase';
import { decrementRequests, incrementRequests } from './requests';

export const addEntry = entry => {
  return {
    type: ADD_ENTRY,
    payload: { entry }
  };
};

export const startAddEntry = entry => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/journal`)
      .push(entry)
      .then(ref => {
        dispatch(
          addEntry({
            ...entry,
            id: ref.key
          })
        );
      });
  };
};

export const clearJournal = () => {
  return {
    type: CLEAR_JOURNAL
  };
};

export const editEntry = (editedEntry, id) => {
  return {
    type: EDIT_ENTRY,
    payload: { editedEntry, id }
  };
};

export const startEditEntry = (editedEntry, id) => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/journal/` + id)
      .update({
        ...editedEntry,
        id: null
      })
      .then(() => {
        dispatch(editEntry(editedEntry, id));
      });
  };
};

export const getJournal = journal => {
  return {
    type: GET_JOURNAL,
    payload: { journal }
  };
};

export const startGetJournal = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(incrementRequests());
    database
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
        dispatch(getJournal(journal));
        dispatch(decrementRequests());
      });
  };
};

export const removeEntry = id => {
  return {
    type: REMOVE_ENTRY,
    payload: { id }
  };
};

export const startRemoveEntry = id => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    database
      .ref(`users/${userId}/journal/` + id)
      .remove()
      .then(() => {
        dispatch(removeEntry(id));
      });
  };
};
