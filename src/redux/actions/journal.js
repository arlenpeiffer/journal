import { ADD_ENTRY } from '../actions';
import uuid from 'uuid';

export const addEntry = ({ date, notes }) => {
  return {
    type: ADD_ENTRY,
    payload: {
      entry: {
        id: uuid(),
        date,
        notes
      }
    }
  };
};
