import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from '../actions';
import uuid from 'uuid';

export const addEntry = ({
  date,
  food,
  movement,
  notes,
  pain,
  sleep,
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
        sleep,
        supplements,
        travel
      }
    }
  };
};

export const editEntry = (editedEntry, id) => {
  return {
    type: EDIT_ENTRY,
    payload: { editedEntry, id }
  };
};

export const removeEntry = id => {
  return {
    type: REMOVE_ENTRY,
    payload: { id }
  };
};
