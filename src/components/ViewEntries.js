import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Entries from './Entries';
import Filters from './Filters';

const ViewEntries = ({ requests }) => (
  <div>
    <Filters />
    {requests > 0 ? <CircularProgress /> : <Entries />}
  </div>
);

const mapStateToProps = state => ({
  requests: state.ui.requests
});

export default connect(mapStateToProps)(ViewEntries);
