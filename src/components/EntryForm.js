import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import moment from 'moment';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    const { entry } = this.props;
    const today = moment()
      .startOf('day')
      .valueOf();
    this.state = {
      date: entry ? entry.date : today,
      notes: entry ? entry.notes : ''
    };
  }
  onDateChange = date => {
    this.setState({
      date: moment(date)
        .startOf('day')
        .valueOf()
    });
  };
  onNotesChange = event => {
    const notes = event.target.value;
    this.setState({ notes });
  };
  onSubmit = event => {
    event.preventDefault();
    const { date, notes } = this.state;
    this.props.onSubmit({ date, notes });
  };
  render() {
    const { date, notes } = this.state;
    return (
      <div>
        <Form>
          <Form.Item label="Date">
            <DatePicker
              allowClear={false}
              format={`MMM D, YYYY`}
              onChange={this.onDateChange}
              value={moment(date)}
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

export default EntryForm;
