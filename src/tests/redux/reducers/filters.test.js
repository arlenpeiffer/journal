import filtersReducer, { defaultState } from '../../../redux/reducers/filters';
import { RESET_FILTERS, SET_FILTERS } from '../../../redux/actions';
import { filters } from '../../testData';

test('should set default state when Redux store initializes', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('should set new filters state when SET_FILTERS action is dispatched', () => {
  const action = {
    type: SET_FILTERS,
    payload: { filters }
  };
  const state = filtersReducer(defaultState, action);
  expect(state).toEqual(filters);
});

test('should reset filters state to default when RESET_FILTERS action is dispatched', () => {
  const action = {
    type: RESET_FILTERS
  };
  const state = filtersReducer(filters, action);
  expect(state).toEqual(defaultState);
});
