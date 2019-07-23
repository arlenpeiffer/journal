import React from 'react';
import { connect } from 'react-redux';
import Entry from './Entry';
import Filters from './Filters';

function ViewEntries(props) {
  return (
    <div>
      ViewEntries.js
      <div>
        <button onClick={() => localStorage.clear()}>Clear</button>
      </div>
      <Filters />
      {props.journal.map(entry => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(ViewEntries);
