import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Header(props) {
  const { loggedIn } = props;
  return (
    <div>
      <h1>Callie's Journal</h1>
      {loggedIn && (
        <div>
          <Link to="/">View Entries</Link>
          <Link to="/add">Add Entry</Link>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.user.userInfo.loggedIn
});

export default connect(mapStateToProps)(Header);
