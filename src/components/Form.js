import React from 'react';

class Form extends React.Component {
  state = {
    date: '',
    notes: ''
  };
  onDateChange = event => {
    const date = event.target.value;
    this.setState({ date });
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
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onDateChange} placeholder="Date" value={date} />
          <input
            onChange={this.onNotesChange}
            placeholder="Notes"
            value={notes}
          />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default Form;
