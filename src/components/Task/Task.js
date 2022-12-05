import React, { PureComponent } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./taskStyle.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

class Task extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectedData: PropTypes.object.isRequired,
    onToggleSelectTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
  };

  handleChange = () => {
    const { onToggleSelectTask, data } = this.props;
    onToggleSelectTask(data._id);
  };

  render() {
    const { data, selectedData, isSelected, onEdit } = this.props;
    const { onDeleteTask } = this.props;
    const task = data;
    const selectedTasks = selectedData;

    return (
      <Card className={`${styles.task} ${isSelected ? styles.selected : ""}`}>
        <Card.Body>
          <input
            type="checkbox"
            onChange={this.handleChange}
            checked={isSelected}
          />

          <Card.Text>{task.title}</Card.Text>
          <Card.Title>{task.description}</Card.Title>

          <Button
            className="m-1"
            variant="warning"
            onClick={() => onEdit(task)}
            disabled={selectedTasks.size !== 0}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>

          <Button
            className="m-1"
            variant="danger"
            onClick={() => onDeleteTask(task._id)}
            disabled={selectedTasks.size !== 0}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
