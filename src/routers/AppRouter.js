import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import AddEntry from '../components/AddEntry';
import EditEntry from '../components/EditEntry';
import Header from '../components/Header';
import Login from '../components/Login';
import ViewEntries from '../components/ViewEntries';

export const history = createBrowserHistory();

function AppRouter(props) {
  const { isLoggedIn } = props;

  return (
    <Router history={history}>
      <div>
        <Header isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/view" component={ViewEntries} />
          <Route path="/add" component={AddEntry} />
          <Route path="/edit/:id" component={EditEntry} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.userInfo.isLoggedIn
});

export default connect(mapStateToProps)(AppRouter);
