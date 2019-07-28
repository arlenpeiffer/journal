import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Option } from './AntFields';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { resetFilters, setFilters } from '../redux/actions/filters';
import moment from 'moment';

function Filters(props) {
  const [endDate, setEndDate] = useState(null);
  const [endDateIsOpen, setEndDateIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newestFirst');
  const [startDate, setStartDate] = useState(null);
  const [text, setText] = useState('');

  const { resetFilters, setFilters } = props;

  const handleDisabledEndDate = endDate => {
    if (!endDate || !startDate) {
      return false;
    }
    return endDate < startDate;
  };

  const handleDisabledStartDate = startDate => {
    if (!startDate || !endDate) {
      return false;
    }
    return startDate < endDate;
  };

  const handleOpenChangeEndDate = isOpen => {
    setEndDateIsOpen(isOpen);
  };

  const handleOpenChangeStartDate = isOpen => {
    if (!isOpen) {
      setEndDateIsOpen(true);
    }
  };

  return (
    <div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Input
          onChange={event => setText(event.target.value)}
          placeholder="Search.."
          value={text}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Select onChange={value => setSortOrder(value)} value={sortOrder}>
          <Option value={'newestFirst'}>Newest First</Option>
          <Option value={'oldestFirst'}>Oldest First</Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <DatePicker
          disabledDate={handleDisabledStartDate}
          format="MMM D, YYYY"
          onChange={date => setStartDate(date && date.startOf('day').valueOf())}
          onOpenChange={handleOpenChangeStartDate}
          placeholder="Start"
          value={startDate && moment(startDate)}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <DatePicker
          disabledDate={handleDisabledEndDate}
          format="MMM D, YYYY"
          onChange={date => setEndDate(date && date.startOf('day').valueOf())}
          onOpenChange={handleOpenChangeEndDate}
          open={endDateIsOpen}
          placeholder="End"
          value={endDate && moment(endDate)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={() => {
            setFilters({ endDate, sortOrder, startDate, text });
          }}
          type="primary"
        >
          Apply Filters
        </Button>
        <Button
          onClick={() => {
            resetFilters();
            setEndDate(null);
            setSortOrder('newestFirst');
            setStartDate(null);
            setText('');
          }}
          style={{ marginLeft: 8 }}
          type="primary"
        >
          Clear Filters
        </Button>
      </Form.Item>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  resetFilters: () => dispatch(resetFilters()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(
  null,
  mapDispatchToProps
)(Filters);
