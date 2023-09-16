import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "../../Task/Task";
import NewTask from "../../newTask/NewTask";
import Confirm from "../../Confirm";
import Search from "../../Search/Search";
import EditTaskModal from "../../EditTaskModal";
import { getTasks, deleteTask, deleteTasks } from "../../../store/actions";

import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "./style.module.css";

class ToDo extends Component {
  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    selectButtonStatus: "Select All",
    isOpenNewTaskModal: false,
    editTask: null,
  };

  componentDidMount() {
    this.props.getTasks(this.props.navigate);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.setState({
        isOpenNewTaskModal: false,
      });
      return;
    }

    if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
      this.setState({
        selectedTasks: new Set(),
        showConfirm: false,
      });
      return;
    }

    if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
      this.setState({
        editTask: null,
      });
      return;
    }
  }

  toggleSelectTask = (taskId) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId);
    } else {
      selectedTasks.add(taskId);
    }

    this.setState({
      selectedTasks,
    });
  };

  deleteSelectedTasks = () => {
    const { selectedTasks } = this.state;
    const { deleteTasks, navigate } = this.props;
    deleteTasks(navigate, selectedTasks);

    this.setState({
      selectedTasks: new Set(),
      showConfirm: false,
    });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toggleSelectAll = () => {
    const { selectButtonStatus } = this.state;
    const {tasks} = this.props;
    const buttonNameSelectAll = "Select All";
    const buttonNameDeselectAll = "Deselect All";

    if (selectButtonStatus === buttonNameSelectAll) {
      this.setState({
        selectButtonStatus: buttonNameDeselectAll,
      });
    } else {
      this.setState({
        selectButtonStatus: buttonNameSelectAll,
      });
    }

    if (selectButtonStatus === buttonNameDeselectAll) {
      this.setState({
        selectedTasks: new Set(),
      });
    } else {
      const taskIds = tasks.map((item) => item._id);
      this.setState({
        selectedTasks: new Set(taskIds),
      });
    }
  };

  toggleNewTaskModal = () => {
    this.setState({
      isOpenNewTaskModal: !this.state.isOpenNewTaskModal,
    });
  };

  handleEdit = (editTask) => {
    this.setState({
      editTask,
    });
  };

  handleSaveTask = (editedTask) => {
    fetch("http://localhost:3001/task/" + editedTask._id, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
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
        const tasks = [...this.state.tasks];
        const foundIndex = tasks.findIndex(
          (task) => task._id === editedTask._id
        );
        tasks[foundIndex] = editedTask;
        this.setState({
          tasks,
          editTask: null,
        });
      })
      .catch((error) => {
        console.log("error catching axper jan.", error);
      });
  };

  render() {
    const {
      isOpenNewTaskModal,
      selectedTasks,
      showConfirm,
      selectButtonStatus,
      editTask,
    } = this.state;
    const { tasks, deleteTask } = this.props;

    const taskComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} sm={4} md={3} lg={2} xl={2}>
          <Task
            data={task}
            selectedData={selectedTasks}
            onToggleSelectTask={this.toggleSelectTask}
            onDeleteTask={deleteTask}
            isSelected={selectedTasks.has(task._id)}
            onEdit={this.handleEdit}
          />
        </Col>
      );
    });
    return (
      <div>
        <h2 className={styles.title}>ToDo List</h2>

        <Container>
          <Row>
            <Col>
              <Search />
            </Col>
          </Row>

          {/*<Row className="justify-content-center">
          <Col xs={10}>
            <NewTask selectedTasks={selectedTasks} onAdd={this.addTask} />
          </Col>
    </Row>*/}
          <Row xs={3} className="justify-content-center">
            <Col>
              <Button
                className={styles.taskBtn}
                variant="primary"
                onClick={this.toggleNewTaskModal}
              >
                Add New Task
              </Button>
            </Col>

            <Col>
              <Button
                className={styles.taskBtn}
                variant="warning"
                onClick={this.toggleSelectAll}
              >
                {selectButtonStatus}
              </Button>
            </Col>

            <Col>
              <Button
                className={styles.taskBtn}
                variant="danger"
                onClick={this.toggleConfirm}
                disabled={selectedTasks.size === 0}
              >
                Delete selected Tasks
              </Button>
            </Col>
          </Row>
          <Row>{taskComponents}</Row>
        </Container>
        {showConfirm && (
          <Confirm
            onClose={this.toggleConfirm}
            onDelete={this.deleteSelectedTasks}
            numOfSelectedTasks={selectedTasks.size}
          />
        )}

        {isOpenNewTaskModal && <NewTask onClose={this.toggleNewTaskModal} />}

        {editTask && (
          <EditTaskModal
            data={editTask}
            onClose={() => this.handleEdit(null)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigate: state.navigate,
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
    deleteTasksSuccess: state.deleteTasksSuccess,
    editTasksSuccess: state.editTasksSuccess,
  };
};

const mapDispatchToProps = {
  getTasks,
  deleteTask,
  deleteTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
