import React, { Component } from "react";
import styles from "./style.module.css";
import idGenerator from "../../helpers/idGenerator";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { Button, InputGroup, Form } from "react-bootstrap";

class ToDo extends Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  getValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  addTask = () => {
    const { tasks } = this.state;
    const inputValue = this.state.inputValue.trim();

    if (inputValue === "") {
      return;
    }

    const newTask = {
      _id: idGenerator(),
      title: inputValue,
    };

    this.setState({
      tasks: [...tasks, newTask],
      inputValue: "",
    });
  };

  deleteTask = (taskId) => {
    const newTasks = this.state.tasks.filter((task) => task._id !== taskId);
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    const { tasks, inputValue } = this.state;

    const taskComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} sm={4} md={3} lg={2} xl={2}>
          <Card className={styles.task}>
            <Card.Body>
              <Card.Title>
                {task.title}
              </Card.Title>
              <Card.Text>Some twxt</Card.Text>
              <Button
                variant="danger"
                onClick={() => this.deleteTask(task._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (
      <div>
        <h2>ToDo List</h2>

        <Container>
          <Row className="justify-content-center">
            <Col xs={10}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Your Task Is..."
                  onChange={this.getValue}
                  value={inputValue}
                />
                <Button
                  onClick={this.addTask}
                  variant="outline-primary"
                  id="button-addon2"
                >
                  Add Task
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>{taskComponents}</Row>
        </Container>
      </div>
    );
  }
}

export default ToDo;
