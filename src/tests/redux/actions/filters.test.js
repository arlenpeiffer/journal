import { RESET_FILTERS, SET_FILTERS } from '../../../redux/actions';
import { resetFilters, setFilters } from '../../../redux/actions/filters';
import { filters } from '../../testData';

test('should generate RESET_FILTERS action object', () => {
  expect(resetFilters()).toEqual({ type: RESET_FILTERS });
});

test('should generate SET_FILTERS action object', () => {
  const { date, sortOrder, text } = filters[1];
  const { endDate, startDate } = date;
  const action = setFilters({ endDate, sortOrder, startDate, text });
  expect(action).toEqual({
    type: SET_FILTERS,
    payload: { filters: filters[1] }
  });
});
