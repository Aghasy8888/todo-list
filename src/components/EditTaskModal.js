import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import { formatDate } from "../helpers/utils";
import { editTask } from "../store/actions";

import { Button, Form, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    const { date } = props.data;

    this.state = {
      ...props.data,
      date: date ? new Date(date) : new Date(),
    };
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
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

  handleSave = () => {
    const { editTask, from, onToggleEditModal, navigate } = this.props;
    const title = this.state.title.trim();
    const description = this.state.description.trim();

    if (title === "") {
      return;
    }

    const editedTask = {
      title,
      description,
      _id: this.state._id,
      date: formatDate(this.state.date.toISOString()),
    };

    editTask(navigate, editedTask, from);
    if (onToggleEditModal) {
      onToggleEditModal();
    }
  };

  getDateValue = (value) => {
    this.setState({
      date: value || new Date(),
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
          <DatePicker
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.getDateValue}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSave} variant="success">
            Save Changes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
