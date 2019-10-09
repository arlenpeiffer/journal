import React from 'react';
import { connect } from 'react-redux';
import Entries from './Entries';
import Filters from './Filters';
import Loading from './Loading';

function ViewEntries(props) {
  const { requests } = props;

  return (
    <div>
      ViewEntries.js
      <Filters />
      {requests > 0 ? <Loading tip="Loading User Data..." /> : <Entries />}
    </div>
  );
}

const mapStateToProps = state => ({
  requests: state.ui.requests
});

export default connect(mapStateToProps)(ViewEntries);
