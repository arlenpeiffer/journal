import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Entry(props) {
  const {
    date,
    food,
    id,
    movement,
    notes,
    pain,
    travel,
    supplements
  } = props.entry;
  return (
    <div>
      <p>
        date: {moment(date).format('MMM D, YYYY')}
        <br />
        id: {id}
        <br />
        notes: {notes}
        <br />
        location: {travel.location}
        <br />
        pain: {pain.rating} - {pain.details}
        <br />
        supplements:{' '}
        {supplements.length > 0
          ? supplements.map(supplement => `${supplement}, `)
          : 'none'}
        <br />
        movement:{' '}
        {movement.length > 0
          ? movement.map(activity => `${activity.type} ${activity.details}, `)
          : 'none'}
        <br />
        meals:{' '}
        {food.meals.length > 0
          ? food.meals.map(meal => `${meal.type} ${meal.time} ${meal.notes}, `)
          : 'none'}
      </p>
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default Entry;
