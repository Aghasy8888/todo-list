import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { formatDate } from "../../../helpers/utils";
import EditTaskModal from "../../EditTaskModal";

export default class SingleTask extends Component {
  state = {
    task: null,
    openEditModal: false,
  };

  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    console.log("taskId", taskId);
    fetch("http://localhost:3001/task/" + taskId, {
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
          task: res,
        });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  }

  deleteTask = () => {
    const taskId = this.state.task._id;

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

        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
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

        this.setState({
          task: res,
          openEditModal: false,
        });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  };

  toggleEditModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal,
    });
  };

  render() {
    const { task, openEditModal } = this.state;

    return (
      <div className="mt-5">
        <Container>
          <Row>
            <Col xs={12}>
              {task ? (
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>

                    <Card.Text>Description:{task.description}</Card.Text>
                    <Card.Text>
                      {/*Date:{task.data?.slice(0, 10)}*/}
                      Date:{formatDate(task.date)}
                    </Card.Text>

                    <Button
                      className="m-1"
                      variant="warning"
                      onClick={this.toggleEditModal}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>

                    <Button
                      className="m-1"
                      variant="danger"
                      onClick={this.deleteTask}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <p>Task data doesn't exist!!</p>
              )}
            </Col>
          </Row>
        </Container>
        {openEditModal && (
          <EditTaskModal
            data={task}
            onClose={this.toggleEditModal}
            onSave={this.handleSaveTask}
          />
        )}
      </div>
    );
  }
}
