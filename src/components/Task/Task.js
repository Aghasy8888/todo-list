import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./taskStyle.module.css";
import PropTypes from "prop-types";

class Task extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectedData: PropTypes.object.isRequired,
    onToggleSelectTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
  };

  state = {
    selected: false,
  };

  handleChange = () => {
    const { onToggleSelectTask, data } = this.props;
    onToggleSelectTask(data._id);

    this.setState({
      selected: !this.state.selected,
    });
  };

  render() {
    const { data, selectedData } = this.props;
    const { onDeleteTask } = this.props;
    const task = data;
    const selectedTasks = selectedData;
    const { selected } = this.state;

    return (
      <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
        <Card.Body>
          <input type="checkbox" onChange={this.handleChange} />
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>Some twxt</Card.Text>
          <Button
            variant="danger"
            onClick={() => onDeleteTask(task._id)}
            disabled={selectedTasks.size !== 0}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
