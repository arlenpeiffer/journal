import React from 'react';
import { Link } from 'react-router-dom';

function Entry(props) {
  const { date, id, notes } = props.entry;
  return (
    <div>
      <p>
        date: {date}
        <br />
        id: {id}
        <br />
        notes: {notes}
      </p>
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default Entry;
