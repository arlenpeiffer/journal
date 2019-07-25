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
    .filter(entry => entry)
    .sort((a, b) => {
      if (state.user.filters.sortBy === 'newestFirst')
        return a.date > b.date ? -1 : 1;
      if (state.user.filters.sortBy === 'oldestFirst')
        return a.date < b.date ? -1 : 1;
    })
});

export default connect(mapStateToProps)(Entries);
