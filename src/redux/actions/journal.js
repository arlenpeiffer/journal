import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from '../actions';
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
            id: ref.key,
            ...entry
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
