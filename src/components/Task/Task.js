import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

import { formatDate, textTruncate } from "../../helpers/utils";
import { editTask } from "../../store/actions";

import { Card, Button } from "react-bootstrap";
import styles from "./taskStyle.module.css";

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
    const {
      data,
      selectedData,
      isSelected,
      onEdit,
      editTask,
      navigate,
      onDeleteTask,
    } = this.props;
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

          <Link to={`/task/${task._id}`}>
            <Card.Title>{textTruncate(task.title, 25)}</Card.Title>
          </Link>

          <Card.Text>
            Description: {textTruncate(task.description, 60)}
          </Card.Text>
          <Card.Text>Status: {task.status}</Card.Text>
          <Card.Text>
            {/*Date:{task.data?.slice(0, 10)}*/}
            Date:{formatDate(task.date)}
          </Card.Text>

          {task.status === "active" ? (
            <Button
              className="m-1"
              variant="success"
              onClick={() => editTask(navigate, { status: "done", _id: task._id })}
              disabled={selectedTasks.size !== 0}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          ) : (
            <Button
              className="m-1"
              variant="secondary"
              onClick={() => editTask(navigate, { status: "active", _id: task._id })}
              disabled={selectedTasks.size !== 0}
            >
              <FontAwesomeIcon icon={faRedo} />
            </Button>
          )}

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
            onClick={() => onDeleteTask(task._id, undefined, navigate)}
            disabled={selectedTasks.size !== 0}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigate: state.navigate,
  };
};

const mapDispatchToProps = {
  editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
