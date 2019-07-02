import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Entry(props) {
  const { date, id, notes } = props.entry;
  return (
    <div>
      <p>
        date: {moment(date).format('MMM D, YYYY')}
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
