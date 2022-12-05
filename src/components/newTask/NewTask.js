import React, { PureComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import idGenerator from "../../helpers/idGenerator";
import PropTypes from "prop-types";

class NewTask extends PureComponent {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    title: "",
    description: "",
  };

  getValue = (e) => {
    const { name, value } = e.target;

    if (name === "Title") {
      this.setState({
        title: value,
      });
    } else {
      this.setState({
        description: value,
      });
    }
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
  };

  render() {
    let { onClose } = this.props;

    return (
      <Modal
        show={true}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Title"
            name="Title"
            onChange={this.getValue}
            onKeyPress={this.addTaskWithEnter}
            className="mb-3"
          />
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Add description here"
            rows={5}
            onChange={this.getValue}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addTask} variant="success">
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewTask;
