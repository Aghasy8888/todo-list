import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function Confirm(props) {
  return (
    <Modal
      show={true}
      onHide={props.onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          You have selected {props.numOfSelectedTasks} task
          {props.numOfSelectedTasks > 1 ? "s" : ""}.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          If you really want to delete selected task
          {props.numOfSelectedTasks > 1 ? "s" : ""} click on "Delete" button.
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onDelete} variant="danger">
          Delete
        </Button>
        <Button onClick={props.onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  numOfSelectedTasks: PropTypes.number.isRequired,
};

export default React.memo(Confirm) ;
