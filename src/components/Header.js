import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';

function Header(props) {
  const { isLoggedIn, logout } = props;

  return (
    <div>
      <h1>Callie's Journal</h1>
      {isLoggedIn && (
        <div>
          <Link to="/view">View Entries</Link>
          <Link to="/add">Add Entry</Link>
          <p onClick={logout}>Sign out</p>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
