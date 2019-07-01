import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddEntry from './AddEntry';
import EditEntry from './EditEntry';
import Header from './Header';
import ViewEntries from './ViewEntries';

function DashboardPage() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={ViewEntries} />
          <Route path="/add" component={AddEntry} />
          <Route path="/edit/:id" component={EditEntry} />
        </Switch>
      </div>
    </Router>
  );
}

export default DashboardPage;
