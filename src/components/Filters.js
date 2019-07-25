import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  setDateFilter,
  sortByNewestFirst,
  sortByOldestFirst
} from '../redux/actions/filters';
import { Button, DatePicker, Form, Select } from 'antd';
import moment from 'moment';

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

  const { setDateFilter, sortByNewestFirst, sortByOldestFirst } = props;

  return (
    <div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Select
          defaultValue={0}
          onChange={value => {
            value === 0 && sortByNewestFirst();
            value === 1 && sortByOldestFirst();
          }}
        >
          <Select.Option value={0}>Newest First</Select.Option>
          <Select.Option value={1}>Oldest First</Select.Option>
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
  sortByNewestFirst: () => dispatch(sortByNewestFirst()),
  sortByOldestFirst: () => dispatch(sortByOldestFirst())
});

export default connect(
  null,
  mapDispatchToProps
)(Filters);
