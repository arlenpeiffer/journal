import React from 'react';
import { connect } from 'react-redux';
import Entry from './Entry';

function Entries(props) {
  const { journal } = props;
  return (
    <div>
      {journal.map(entry => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
    .filter(entry => {
      const { startDate, endDate } = state.user.filters.date;
      const startDateMatch = startDate ? entry.date >= startDate : true;
      const endDateMatch = endDate ? entry.date <= endDate : true;
      return startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      const { sortOrder } = state.user.filters;
      if (sortOrder === 'newestFirst') return a.date > b.date ? -1 : 1;
      if (sortOrder === 'oldestFirst') return a.date < b.date ? -1 : 1;
    })
});

export default connect(mapStateToProps)(Entries);
