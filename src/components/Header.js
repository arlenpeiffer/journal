import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/userInfo';

export function Header(props) {
  const { isLoggedIn, signOut } = props;
  return (
    <div>
      <h1>Callie's Journal</h1>
      {isLoggedIn && (
        <div>
          <Link to="/view">View Entries</Link>
          <Link to="/add">Add Entry</Link>
          <p onClick={signOut}>Sign out</p>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);
