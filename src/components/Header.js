import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { logout } from '../redux/actions/user';

const HeaderWrapper = styled.div`
  margin-bottom: 24px;
`;

const Navigation = styled.div`
  * {
    cursor: pointer;
    margin-right: 8px;
    padding-bottom: 4px;
    text-decoration: none;
  }

  & > .selected span {
    border-bottom: 4px solid;
  }
`;

const Header = ({ isLoggedIn, logout }) => {
  const NavItem = ({ children, ...props }) => (
    <Typography color="primary" variant="button" {...props}>
      {children}
    </Typography>
  );

  return (
    <HeaderWrapper>
      <Typography variant="h4">Callie's Journal</Typography>
      {isLoggedIn && (
        <Navigation>
          <Link to="/view" activeClassName="selected">
            <NavItem>View Entries</NavItem>
          </Link>
          <Link to="/add" activeClassName="selected">
            <NavItem>Add Entry</NavItem>
          </Link>
          <NavItem onClick={logout}>Sign Out</NavItem>
        </Navigation>
      )}
    </HeaderWrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Header);
