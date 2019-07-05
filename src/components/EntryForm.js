import React from 'react';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    const { entry } = this.props;
    this.state = {
      date: entry
        ? entry.date
        : moment()
            .startOf('day')
            .valueOf(),
      dateError: false,
      notes: entry ? entry.notes : '',
      travel: {
        isTraveling: entry ? entry.travel.isTraveling : false,
        location: entry ? entry.travel.location : 'Home'
      }
    };
  }
  onDateChange = date => {
    this.setState({
      date: moment(date)
        .startOf('day')
        .valueOf(),
      dateError: false
    });
  };
  onNotesChange = event => {
    const notes = event.target.value;
    this.setState({ notes });
  };
  onTravelRadioChange = event => {
    const isTraveling = event.target.value;
    const location = isTraveling ? '' : 'Home';
    this.setState({ travel: { isTraveling, location } });
  };
  onTravelInputChange = event => {
    const location = event.target.value;
    const { travel } = this.state;
    this.setState({ travel: { ...travel, location } });
  };
  onSubmit = event => {
    event.preventDefault();
    const { date, notes, travel } = this.state;
    const { entry, journal } = this.props;
    if (entry && entry.date === date) {
      this.props.onSubmit({ date, notes, travel });
    } else if (journal.some(entry => entry.date === date)) {
      this.setState({ dateError: true });
    } else {
      this.props.onSubmit({ date, notes, travel });
    }
  };
  render() {
    const { date, dateError, notes } = this.state;
    const { location, isTraveling } = this.state.travel;
    return (
      <div>
        <Form>
          <Form.Item
            label="Date"
            validateStatus={dateError && 'warning'}
            help={dateError && `There is already an entry for that date.`}
          >
            <DatePicker
              allowClear={false}
              format={`MMM D, YYYY`}
              onChange={this.onDateChange}
              value={moment(date)}
            />
          </Form.Item>
          <Form.Item>
            <Radio.Group
              onChange={this.onTravelRadioChange}
              value={isTraveling}
            >
              <Radio value={false}>No</Radio>
              <Radio value={true}>Yes</Radio>
            </Radio.Group>
            <Input
              onChange={this.onTravelInputChange}
              disabled={!isTraveling}
              value={location}
            />
          </Form.Item>
          <Form.Item label="Notes">
            <Input.TextArea
              onChange={this.onNotesChange}
              placeholder={`Notes`}
              value={notes}
            />
          </Form.Item>
          <Button onClick={this.onSubmit} type={`primary`}>
            Add
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(EntryForm);
