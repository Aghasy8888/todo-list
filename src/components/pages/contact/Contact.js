import React, { useState } from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import styles from "./ContactStyles.module.css";

const errorMassage = "Field is required";

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    if (!value) {
      setErrors({
        ...errors,
        [name]: errorMassage,
      });
    } else {
      setErrors({
        ...errors,
        [name]: null,
      });
    }

    if (name === "email" && value) {
      const emailReg =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailReg.test(value)) {
        setErrors({
          ...errors,
          email: "Invalid email",
        });
      }
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const errorsArray = Object.values(errors);
    const errorsExist = !errorsArray.every((el) => el === null);
    const valuesArray = Object.values(values);
    const valuesExist = valuesArray.some((el) => el !== "");

    if (valuesExist && !errorsExist) {
      fetch("http://localhost:3001/form", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const res = await response.json();

          if (response.status >= 400 && response.status < 600) {
            if (res.error) {
              throw res.error;
            } else {
              throw new Error("Something went wrong");
            }
          }

          console.log("Form was sent successfully");

          setValues({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.log("error catching bremn jan.", error);
        });

      return;
    }

    if (!valuesExist && !errorsExist) {
      setErrors({
        name: errorMassage,
        email: errorMassage,
        message: errorMassage,
      });
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={7}>
          <Form className="mt-5">
            <h2 className="text-center">Contact Us</h2>
            <Form.Group>
              <Form.Control
                className={errors.name ? styles.invalid : ""}
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className={errors.email ? styles.invalid : ""}
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className={errors.message ? styles.invalid : ""}
                as="textarea"
                placeholder="Enter your message"
                rows={5}
                name="message"
                onChange={handleChange}
                value={values.message}
              />
              <Form.Text className="text-danger">{errors.message}</Form.Text>
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                className={styles.submitButton}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
