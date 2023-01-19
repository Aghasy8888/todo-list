import request from "../helpers/request";
import * as actionTypes from "./actionTypes";
import { useNavigate } from "react-router-dom";

const apiHost = process.env.REACT_APP_API_HOST

export function getTasks(searchParams = {}) {
  const query = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  

  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task?${query}`)
      .then((tasks) => {
        dispatch({ type: actionTypes.GET_TASKS, tasks: tasks });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function getSingleTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/${taskId}`  )
      .then((task) => {
        dispatch({ type: actionTypes.GET_SINGLE_TASK, task });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function addTask(newTask) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task`, "POST", newTask)
      .then((task) => {
        dispatch({ type: actionTypes.ADD_TASK, task });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function DeleteTask(taskId, from) {
  const navigate = useNavigate();
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/${taskId}`, "DELETE")
      .then(() => {
        dispatch({ type: actionTypes.DELETE_TASK, taskId, from });
        if (from === "single") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function deleteTasks(taskIds) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task`, "PATCH", {
      tasks: [...taskIds],
    })
      .then(() => {
        dispatch({ type: actionTypes.GROUP_DELETE_TASKS, taskIds });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function editTask(data, from) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/${data._id}`, "PUT", data)
      .then((editedTask) => {
        dispatch({ type: actionTypes.EDIT_TASK, editedTask, from });
      })
      .catch((error) => {
        console.log("error catching bremn jan.", error);
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}
