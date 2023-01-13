import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { formatDate } from "../../../helpers/utils";
import EditTaskModal from "../../EditTaskModal";
import { useNavigate, useParams } from "react-router";
import { getSingleTask } from "../../../store/actions";
import { connect } from "react-redux";

function SingleTask() {
  const [values, setValues] = useState({
    openEditModal: false,
  });
  const history = useNavigate();
  const params = useParams();

  const { openEditModal } = values;
  const { task } = this.props;

  useEffect(() => {
    const taskId = params.taskId;
    this.props.getSingleTask(taskId);
  }, []);

  const deleteTask = () => {
    const taskId = task._id;

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

        history("/");
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
      });
  };

  const toggleEditModal = () => {
    setValues({
      ...values,
      openEditModal: !values.openEditModal,
    });
  };

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
                    onClick={toggleEditModal}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>

                  <Button className="m-1" variant="danger" onClick={deleteTask}>
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
          onClose={toggleEditModal}
          from="single"
        />
      )}
    </div>
  );
}

const mapDispatchToProps = {
  getSingleTask,
};

const mapStateToProps = (state) => {
  return {
    task: state.task,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
