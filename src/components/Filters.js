import React from 'react';
import { connect } from 'react-redux';
import { Option } from './AntFields';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import {
  setDateFilter,
  setSortOrder,
  setTextFilter
} from '../redux/actions/filters';
import { defaultState } from '../redux/reducers/filters';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      isOpen: false
    };
  }

  applyFilters = (startDate, endDate, sortOrder, text) => {
    const { setDateFilter, setSortOrder, setTextFilter } = this.props;
    setDateFilter(startDate, endDate);
    setSortOrder(sortOrder);
    setTextFilter(text);
  };

  handleDisabledEndDate = endDate => {
    const { startDate } = this.state.date;
    if (!endDate || !startDate) {
      return false;
    }
    return endDate < startDate;
  };

  handleDisabledStartDate = startDate => {
    const { endDate } = this.state.date;
    if (!startDate || !endDate) {
      return false;
    }
    return startDate < endDate;
  };

  handleOpenChangeEndDate = isOpen => {
    this.setState({ isOpen });
  };

  handleOpenChangeStartDate = isOpen => {
    if (!isOpen) {
      this.setState({ isOpen: true });
    }
  };

  resetFilters = () => {
    const { setDateFilter, setSortOrder, setTextFilter } = this.props;
    setDateFilter(null, null);
    setSortOrder('newestFirst');
    setTextFilter('');
  };

  render() {
    const { date, isOpen, sortOrder, text } = this.state;
    const { startDate, endDate } = date;

    return (
      <div>
        <Form.Item style={{ marginBottom: 0 }}>
          <Input
            onChange={event => this.setState({ text: event.target.value })}
            placeholder="Search.."
            value={text}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Select
            onChange={value => this.setState({ sortOrder: value })}
            value={sortOrder}
          >
            <Option value={'newestFirst'}>Newest First</Option>
            <Option value={'oldestFirst'}>Oldest First</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <DatePicker
            disabledDate={this.handleDisabledStartDate}
            format="MMM D, YYYY"
            onChange={date =>
              this.setState({
                date: {
                  startDate: date && date.startOf('day').valueOf(),
                  endDate
                }
              })
            }
            onOpenChange={this.handleOpenChangeStartDate}
            placeholder="Start"
            value={startDate && moment(startDate)}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <DatePicker
            disabledDate={this.handleDisabledEndDate}
            format="MMM D, YYYY"
            onChange={date =>
              this.setState({
                date: {
                  startDate,
                  endDate: date && date.startOf('day').valueOf()
                }
              })
            }
            onOpenChange={this.handleOpenChangeEndDate}
            open={isOpen}
            placeholder="End"
            value={endDate && moment(endDate)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => {
              this.applyFilters(startDate, endDate, sortOrder, text);
            }}
            type="primary"
          >
            Apply Filters
          </Button>
          <Button
            onClick={() => {
              this.resetFilters();
              this.setState(defaultState);
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
}

const mapDispatchToProps = dispatch => ({
  setDateFilter: (startDate, endDate) =>
    dispatch(setDateFilter(startDate, endDate)),
  setSortOrder: sortOrder => dispatch(setSortOrder(sortOrder)),
  setTextFilter: text => dispatch(setTextFilter(text))
});

export default connect(
  null,
  mapDispatchToProps
)(Filters);
