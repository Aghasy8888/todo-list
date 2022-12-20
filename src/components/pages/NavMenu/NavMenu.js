import React from "react";
import Nav from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "./navMenuStyle.module.css";

export default function NavMenu() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Nav className="mr-auto">
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/about"
        >
          About Us
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/contact"
        >
          Contact Us
        </NavLink>
      </Nav>
    </Navbar>
  );
}
