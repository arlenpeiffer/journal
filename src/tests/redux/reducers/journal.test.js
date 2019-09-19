import journalReducer, { defaultState } from '../../../redux/reducers/journal';
import {
  ADD_ENTRY,
  EDIT_ENTRY,
  GET_JOURNAL,
  REMOVE_ENTRY
} from '../../../redux/actions';
import { journal } from '../../testData';
import omit from 'lodash.omit';

const testEntry1 = journal[0];
const testEntry2 = journal[1];

test('should set default state when Redux store initializes', () => {
  const state = journalReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('should add entry to journal when ADD_ENTRY action is dispatched', () => {
  const action = {
    type: ADD_ENTRY,
    payload: { entry: testEntry1 }
  };
  const state = journalReducer(defaultState, action);
  expect(state).toEqual([testEntry1]);
});

test('should edit entry in journal when EDIT_ENTRY action is dispatched', () => {
  const editedEntry = omit(testEntry2, 'id');
  const { id } = testEntry1;
  const action = {
    type: EDIT_ENTRY,
    payload: { editedEntry, id }
  };
  const state = journalReducer([testEntry1], action);
  expect(state).toEqual([{ ...testEntry1, ...editedEntry }]);
});

test('should load journal entries when GET_JOURNAL action is dispatched', () => {
  const action = {
    type: GET_JOURNAL,
    payload: { journal }
  };
  const state = journalReducer(defaultState, action);
  expect(state).toEqual(journal);
});

test('should remove entry from journal when REMOVE_ENTRY action is dispatched', () => {
  const { id } = testEntry2;
  const action = {
    type: REMOVE_ENTRY,
    payload: { id }
  };
  const state = journalReducer(journal, action);
  expect(state).toEqual([testEntry1]);
});
