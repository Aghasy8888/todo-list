import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navMenuStyle.module.css";
import { connect } from "react-redux";
import { logout } from "../../../store/userActions";

function NavMenu({ isAuthenticated, logout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className={styles.bigCtn}>
      <Navbar expand="lg" variant="light" bg="light">
        <Nav className={`mr-auto`}>
          <div className={styles.navbarCtn}>
            {isAuthenticated && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="/"
              >
                Home
              </NavLink>
            )}

            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.unActive
              }
              to="/about"
            >
              About Us
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.unActive
              }
              to="/contact"
            >
              Contact Us
            </NavLink>

            {!isAuthenticated && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </Nav>
      </Navbar>
      {isAuthenticated && (
        <Button onClick={handleLogout} className={styles.logoutBtn}>
          Log Out
        </Button>
      )}
    </div>
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
