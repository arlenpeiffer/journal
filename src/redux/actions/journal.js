import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from '../actions';
import uuid from 'uuid';

export const addEntry = ({
  date,
  food,
  movement,
  notes,
  pain,
  supplements,
  travel
}) => {
  return {
    type: ADD_ENTRY,
    payload: {
      entry: {
        id: uuid(),
        date,
        food,
        movement,
        notes,
        pain,
        supplements,
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

export const removeEntry = id => {
  return {
    type: REMOVE_ENTRY,
    payload: { id }
  };
};
