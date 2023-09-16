import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { createNavigatorAction } from "../../../store/actions";
import { login } from "../../../store/userActions";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./loginStyle.module.css";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const navigatorFunction = (path) => {
      navigate(path);
    };

    dispatch(createNavigatorAction(navigatorFunction));
  }, [dispatch, navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleSubmit = () => {
    const { email, password } = values;

    setErrors({
      email: email ? null : "Email is required",
      password: password ? null : "Password is required",
    });

    if (email && password) {
      props.login(values, navigate);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className={styles.loginCtn}>
      <Container className={styles.ctn}>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <Form>
              <h3 className={styles.heading}>Login</h3>
              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={errors.email ? styles.invalid : ""}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onKeyDown={(event) => handleKeyDown(event)}
                />
                {<Form.Text className="text-danger">{errors.email}</Form.Text>}
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={errors.password ? styles.invalid : ""}
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  onKeyDown={(event) => handleKeyDown(event)}
                />
                {
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                }
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
              <p className={styles.linkToRegister}>
                <Link to="/register" >
                  Don't have account yet? Register now!
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(Login);
