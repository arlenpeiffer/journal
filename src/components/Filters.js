import React from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import isEqual from 'lodash.isequal';
import MenuItem from '@material-ui/core/MenuItem';

import { setFilters } from '../redux/actions/filters';
import ButtonPrimary from './ButtonPrimary';
import DatePicker from './DatePicker';
import Input from './Input';
import Select from './Select';

// TODO: replace with emotion css prop //
const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const initialValues = {
  date: {
    startDate: null,
    endDate: null
  },
  sortOrder: 'newestFirst',
  text: ''
};

const Filters = ({ filters, setFilters }) => {
  const handleDisableEndDates = (date, startDate) => {
    if (!startDate) return false;
    return date < startDate;
  };

  const handleDisableStartDates = (date, endDate) => {
    if (!endDate) return false;
    return date > endDate;
  };

  return (
    <Formik initialValues={filters} onSubmit={values => console.log(values)}>
      {({ setValues, values }) => {
        const { date, text } = values;
        const { endDate, startDate } = date;

        const filtersEqualInitialValues = isEqual(values, initialValues);
        const filtersTextValueIsEmptyString = filters.text === '';

        const handleApplyFilters = () => {
          setFilters(values);
        };

        const handleClearFilters = () => {
          setFilters(initialValues);
          setValues(initialValues);
        };

        return (
          <Form>
            <FiltersContainer>
              <Input
                allowReset
                label="Search"
                name="text"
                placeholder="Search for specific text.."
                resetDependencies={[filters]}
                resetValue={filtersTextValueIsEmptyString ? '' : text}
              />
              <Select label="Sort Order" name="sortOrder">
                <MenuItem value="newestFirst">Newest First</MenuItem>
                <MenuItem value="oldestFirst">Oldest First</MenuItem>
              </Select>
              <DatePicker
                clearable
                label="Start Date"
                name="date.startDate"
                placeholder="Select a date"
                shouldDisableDate={date =>
                  handleDisableStartDates(date, endDate)
                }
              />
              <DatePicker
                clearable
                label="End Date"
                name="date.endDate"
                placeholder="Select a date"
                shouldDisableDate={date =>
                  handleDisableEndDates(date, startDate)
                }
              />
            </FiltersContainer>
            <ButtonPrimary
              disabled={filtersEqualInitialValues}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </ButtonPrimary>
            <ButtonPrimary
              disabled={filtersEqualInitialValues}
              onClick={handleClearFilters}
            >
              Clear Filters
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = state => ({
  filters: state.ui.filters
});

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
