import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/userInfo';

export function Header(props) {
  const { isLoggedIn, startLogout } = props;
  return (
    <div>
      <h1>Callie's Journal</h1>
      {isLoggedIn && (
        <div>
          <Link to="/view">View Entries</Link>
          <Link to="/add">Add Entry</Link>
          <p onClick={startLogout}>Sign out</p>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);
