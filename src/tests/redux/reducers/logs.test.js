import logsReducer, { defaultState } from '../../../redux/reducers/logs';
import {
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  REMOVE_SUPPLEMENT,
  GET_LOGS
} from '../../../redux/actions';
import { logs } from '../../testData';

const food = 'matcha latte';
const movement = 'swimming';
const nsaid = 'Celebrex';
const supplements = ['B-12', 'Cod Liver Oil'];

test('should set default state when Redux store initializes', () => {
  const state = logsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('should add food to logs when ADD_FOOD action is dispatched', () => {
  const action = {
    type: ADD_FOOD,
    payload: { food }
  };
  const state = logsReducer(logs, action);
  expect(state).toEqual({
    ...logs,
    food: [...logs.food, food].sort()
  });
});

test('should add movement to logs when ADD_MOVEMENT action is dispatched', () => {
  const action = {
    type: ADD_MOVEMENT,
    payload: { movement }
  };
  const state = logsReducer(logs, action);
  expect(state).toEqual({
    ...logs,
    movement: [...logs.movement, movement].sort()
  });
});

test('should add nsaid to logs when ADD_NSAID action is dispatched', () => {
  const action = {
    type: ADD_NSAID,
    payload: { nsaid }
  };
  const state = logsReducer(logs, action);
  expect(state).toEqual({
    ...logs,
    nsaid: [...logs.nsaid, nsaid]
  });
});

test('should add supplement to logs when ADD_SUPPLEMENT action is dispatched', () => {
  const supplement = supplements[0];
  const action = {
    type: ADD_SUPPLEMENT,
    payload: { supplement }
  };
  const state = logsReducer(logs, action);
  expect(state).toEqual({
    ...logs,
    supplements: [...logs.supplements, supplement]
  });
});

test('should load logs when GET_LOGS action is dispatched', () => {
  const action = {
    type: GET_LOGS,
    payload: { logs }
  };
  const state = logsReducer(defaultState, action);
  expect(state).toEqual(logs);
});

test('should remove supplement from logs when REMOVE_SUPPLEMENT action is dispatched', () => {
  const removedSupplement = supplements[1];
  const action = {
    type: REMOVE_SUPPLEMENT,
    payload: { supplement: removedSupplement }
  };
  const state = logsReducer(logs, action);
  expect(state).toEqual({
    ...logs,
    supplements: logs.supplements.filter(
      supplement => supplement !== removedSupplement
    )
  });
});
