import { ADD_ENTRY, EDIT_ENTRY } from '../actions';
import uuid from 'uuid';

export const addEntry = ({ date, notes, pain, travel }) => {
  return {
    type: ADD_ENTRY,
    payload: {
      entry: {
        id: uuid(),
        date,
        notes,
        pain,
        travel
      }
    }
  };
};

export const editEntry = (id, editedEntry) => {
  return {
    type: EDIT_ENTRY,
    payload: { id, editedEntry }
  };
};
