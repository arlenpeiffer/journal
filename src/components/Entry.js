import React from 'react';

function Entry(props) {
  const { date, id, notes } = props.entry;
  return (
    <p>
      date: {date}
      <br />
      id: {id}
      <br />
      notes: {notes}
    </p>
  );
}

export default Entry;
