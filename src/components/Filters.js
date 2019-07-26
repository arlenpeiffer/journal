import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, DatePicker, Form, Select } from 'antd';
import moment from 'moment';
import {
  setDateFilter,
  setSortOrder,
  setTextFilter
} from '../redux/actions/filters';

function Filters(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endOpen, setEndOpen] = useState(false);

  const handleEndDisabled = endDate => {
    if (!endDate || !startDate) {
      return false;
    }
    return endDate < startDate;
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };

  const handleStartDisabled = startDate => {
    if (!startDate || !endDate) {
      return false;
    }
    return startDate < endDate;
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const { setDateFilter, setSortOrder, setTextFilter } = props;

  return (
    <div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Select
          defaultValue={'newestFirst'}
          onChange={value => {
            setSortOrder(value);
          }}
        >
          <Select.Option value={'newestFirst'}>Newest First</Select.Option>
          <Select.Option value={'oldestFirst'}>Oldest First</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <DatePicker
          disabledDate={handleStartDisabled}
          format="MMM D, YYYY"
          onChange={date => {
            setStartDate(date && date.startOf('day').valueOf());
          }}
          onOpenChange={handleStartOpenChange}
          placeholder="Start"
          value={startDate && moment(startDate)}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <DatePicker
          disabledDate={handleEndDisabled}
          format="MMM D, YYYY"
          onChange={date => {
            setEndDate(date && date.startOf('day').valueOf());
          }}
          onOpenChange={handleEndOpenChange}
          open={endOpen}
          placeholder="End"
          value={endDate && moment(endDate)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={() => {
            setDateFilter(startDate, endDate);
          }}
          type="primary"
        >
          Apply Filters
        </Button>
      </Form.Item>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setDateFilter: (startDate, endDate) =>
    dispatch(setDateFilter(startDate, endDate)),
  setSortOrder: sortOrder => dispatch(setSortOrder(sortOrder))
});

export default connect(
  null,
  mapDispatchToProps
)(Filters);
