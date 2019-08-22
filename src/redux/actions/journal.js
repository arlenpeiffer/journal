import { ADD_ENTRY, EDIT_ENTRY, GET_JOURNAL, REMOVE_ENTRY } from '../actions';
import { database } from '../../firebase/firebase';

export const addEntry = entry => {
  return {
    type: ADD_ENTRY,
    payload: { entry }
  };
};

export const startAddEntry = entry => {
  return dispatch => {
    database
      .ref('user/callie/journal')
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

export const editEntry = (editedEntry, id) => {
  return {
    type: EDIT_ENTRY,
    payload: { editedEntry, id }
  };
};

export const startEditEntry = (editedEntry, id) => {
  return dispatch => {
    database
      .ref('user/callie/journal/' + id)
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
  return dispatch => {
    database
      .ref('user/callie/journal/')
      .once('value')
      .then(snapshot => {
        const journal = [];
        snapshot.forEach(childSnapshot => {
          journal.push({
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
            supplements: childSnapshot.val().supplements || [],
            travel: childSnapshot.val().travel
          });
        });
        dispatch(getJournal(journal));
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
  return dispatch => {
    database
      .ref('user/callie/journal/' + id)
      .remove()
      .then(() => {
        dispatch(removeEntry(id));
      });
  };
};
