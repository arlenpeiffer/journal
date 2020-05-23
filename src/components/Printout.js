import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import moment from 'moment';

import Filters from './Filters';
import PrintoutEntry from './PrintoutEntry';

const Printout = props => {
  const { journal, user } = props;

  const userName = user.name && `${user.name.first} ${user.name.last}`;

  return (
    <div>
      <Filters />
      <Typography.Title>{userName}</Typography.Title>
      <Typography.Text code>
        Journal Printout {moment().format('MM-DD-YY')}
      </Typography.Text>
      {journal
        .sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        })
        .map(entry => (
          <PrintoutEntry key={entry.id} entry={entry} />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  journal: state.user.journal
    .filter(entry => {
      const { startDate, endDate } = state.ui.filters.date;
      const startDateMatch = startDate ? entry.date >= startDate : true;
      const endDateMatch = endDate ? entry.date <= endDate : true;
      const { text } = state.ui.filters;
      const textMatch = text
        ? entry.food.diet.notes.toLowerCase().includes(text.toLowerCase()) ||
          entry.food.diet.type.toLowerCase().includes(text.toLowerCase()) ||
          entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.ingredients.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.name.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.notes.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.portion.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.notes.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.mood.some(mood =>
            mood.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.movement.some(movement =>
            movement.type.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.notes.toLowerCase().includes(text.toLowerCase()) ||
          entry.pain.details.toLowerCase().includes(text.toLowerCase()) ||
          entry.sleep.notes.toLowerCase().includes(text.toLowerCase()) ||
          entry.stomach.notes.toLowerCase().includes(text.toLowerCase()) ||
          entry.supplements.some(supplement =>
            supplement.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.travel.location.toLowerCase().includes(text.toLowerCase())
        : true;
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      const { sortOrder } = state.ui.filters;
      if (sortOrder === 'newestFirst') return a.date > b.date ? -1 : 1;
      if (sortOrder === 'oldestFirst') return a.date < b.date ? -1 : 1;
    }),
  user: state.user.profile
});

export default connect(mapStateToProps)(Printout);
