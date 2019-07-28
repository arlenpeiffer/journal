import React from 'react';
import Entries from './Entries';
import Filters from './Filters';

function ViewEntries() {
  return (
    <div>
      ViewEntries.js
      <div>
        <button onClick={() => localStorage.clear()}>Clear</button>
      </div>
      <Filters />
      <Entries />
    </div>
  );
}

export default ViewEntries;
