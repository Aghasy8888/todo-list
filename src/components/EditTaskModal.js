import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
    };
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  getValue = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
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

    this.props.onSave({
      title,
      description,
      _id: this.state._id,
    });
  };

  render() {
    let { onClose } = this.props;
    const { title, description } = this.state;

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
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.getValue}
            onKeyPress={this.addTaskWithEnter}
            className="mb-3"
          />
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Add description here"
            value={description}
            rows={5}
            onChange={this.getValue}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addTask} variant="success">
            Save Changes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditTaskModal;
