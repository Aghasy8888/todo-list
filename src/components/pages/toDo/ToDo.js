import React, { Component } from "react";
//import styles from "./style.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Task from "../../Task/Task";
import NewTask from "../../newTask/NewTask";
import Confirm from "../../Confirm";
import EditTaskModal from "../../EditTaskModal";

import { Button } from "react-bootstrap";

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
    const { tasks } = this.state;
    fetch("http://localhost:3001/task", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("res", res);

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong");
          }
        }

        this.setState({
          tasks: res,
        });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  }

  addTask = (newTask) => {
    console.log(1);
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const res = await response.json();
        const { tasks } = this.state;

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong");
          }
        }
        console.log("res", res);
        this.setState({
          tasks: [...tasks, res],
          isOpenNewTaskModal: false,
        });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  };

  deleteTask = (taskId) => {
    fetch("http://localhost:3001/task/" + taskId, {
      method: "DELETE",
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

        const newTasks = this.state.tasks.filter((task) => task._id !== taskId);
        this.setState({
          tasks: newTasks,
        });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  };

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
    const body = {
      tasks: [...selectedTasks],
    };

    fetch("http://localhost:3001/task", {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
        const restOfTasks = tasks.filter(
          (task) => !selectedTasks.has(task._id)
        );

        this.setState({
          tasks: restOfTasks,
          selectedTasks: new Set(),
          showConfirm: false,
        });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toggleSelectAll = () => {
    const { tasks, selectButtonStatus } = this.state;
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
        console.log("error catching bremn jan.", error);
      });
  };

  render() {
    const {
      isOpenNewTaskModal,
      tasks,
      selectedTasks,
      showConfirm,
      selectButtonStatus,
      editTask,
    } = this.state;

    const taskComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} sm={4} md={3} lg={2} xl={2}>
          <Task
            data={task}
            selectedData={selectedTasks}
            onToggleSelectTask={this.toggleSelectTask}
            onDeleteTask={this.deleteTask}
            isSelected={selectedTasks.has(task._id)}
            onEdit={this.handleEdit}
          />
        </Col>
      );
    });
    return (
      <div>
        <h2>ToDo List</h2>

        <Container>
          {/*<Row className="justify-content-center">
          <Col xs={10}>
            <NewTask selectedTasks={selectedTasks} onAdd={this.addTask} />
          </Col>
    </Row>*/}
          <Row xs={3} className="justify-content-center">
            <Col>
              <Button variant="primary" onClick={this.toggleNewTaskModal}>
                Add New Task
              </Button>
            </Col>

            <Col>
              <Button variant="warning" onClick={this.toggleSelectAll}>
                {selectButtonStatus}
              </Button>
            </Col>

            <Col>
              <Button
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

        {isOpenNewTaskModal && (
          <NewTask onClose={this.toggleNewTaskModal} onAdd={this.addTask} />
        )}

        {editTask && (
          <EditTaskModal
            data={editTask}
            onClose={() => this.handleEdit(null)}
            onSave={this.handleSaveTask}
          />
        )}
      </div>
    );
  }
}

export default ToDo;