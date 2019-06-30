import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Header(props) {
  const { isLoggedIn } = props;
  return (
    <div>
      <h1>Callie's Journal</h1>
      {isLoggedIn && (
        <div>
          <Link to="/">View Entries</Link>
          <Link to="/add">Add Entry</Link>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.userInfo.isLoggedIn
});

export default connect(mapStateToProps)(Header);
