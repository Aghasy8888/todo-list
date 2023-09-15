import React, { PureComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatDate } from "../../helpers/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addTask } from "../../store/actions";

class NewTask extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  state = {
    title: "",
    description: "",
    date: new Date(),
  };

  getValue = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  addTaskWithEnter = (event) => {
    if (event.key === "Enter") {
      this.handleSave(this.props.navigate);
    }
  };

  handleSave = (navigate) => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    const { date } = this.state;

    if (title === "") {
      return;
    }

    const newTask = {
      title,
      description,
      date: formatDate(date.toISOString()),
    };
    this.props.addTask(navigate, newTask);
  };

  getDateValue = (value) => {
    this.setState({
      date: value || new Date(),
    });
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
            name="title"
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
          <DatePicker
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.getDateValue}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.handleSave(this.props.navigate)} variant="success">
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigate: state.navigate
  }
}

const mapDispatchToProps = {
  addTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
