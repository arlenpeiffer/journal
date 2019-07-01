import React from 'react';
import { connect } from 'react-redux';
import Entry from './Entry';

function ViewEntries(props) {
  return (
    <div>
      ViewEntries.js
      {props.journal.map(entry => (
        <Entry entry={entry} />
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
});

export default connect(mapStateToProps)(ViewEntries);
