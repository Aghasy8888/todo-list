import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions';

function NavMenu({ isAuthenticated, logout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <Navbar expand='lg' variant='light' bg='light'>
      <Nav className='mr-auto'>
        {isAuthenticated && (
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to='/'
          >
            Home
          </NavLink>
        )}

        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to='/about'
        >
          About Us
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to='/contact'
        >
          Contact Us
        </NavLink>

        {isAuthenticated ? (
          <Button onClick={handleLogout}>Log Out</Button>
        ) : (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to='/login'
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to='/register'
            >
              Register
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
