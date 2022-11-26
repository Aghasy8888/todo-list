import React, { Component } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import idGenerator from "../../helpers/idGenerator";
import PropTypes from "prop-types";

class NewTask extends Component {
  static propTypes = {
    selectedTasks: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    title: "",
    description: "",
  };

  getValue = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  addTaskWithEnter = (event) => {
    if (event.key === "Enter") {
      this.addTask();
    }
  };

  addTask = () => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();

    if (title === "") {
      return;
    }

    const newTask = {
      _id: idGenerator(),
      title,
      description,
    };

    this.props.onAdd(newTask);
    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    let { title } = this.state;
    let { selectedTasks } = this.props;

    return (
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Title"
          onChange={this.getValue}
          value={title}
          disabled={selectedTasks.size !== 0}
          onKeyPress={this.addTaskWithEnter}
        />
        <Button
          onClick={this.addTask}
          variant="outline-primary"
          id="button-addon2"
          disabled={selectedTasks.size !== 0}
        >
          Add Task
        </Button>
      </InputGroup>
    );
  }
}

export default NewTask;
