import request from "../helpers/request";
import requestWithoutToken from "../helpers/auth";
import * as actionTypes from "./actionTypes";
import { saveToken, removeJWT, getLocalJWT } from "../helpers/auth";

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(navigate, searchParams = {}) {
  const query = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(navigate, `${apiHost}/task?${query}`)
      .then((tasks) => {
        if (!tasks) return;
        dispatch({ type: actionTypes.GET_TASKS, tasks: tasks });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function getSingleTask(navigate, taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(navigate, `${apiHost}/task/${taskId}`)
      .then((task) => {
        if (!task) return;
        dispatch({ type: actionTypes.GET_SINGLE_TASK, task });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function addTask(navigate, newTask) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(navigate, `${apiHost}/task`, "POST", newTask)
      .then((task) => {
        if (!task) return;
        dispatch({ type: actionTypes.ADD_TASK, task });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function deleteTask(taskId, from, navigate) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    request(navigate, `${apiHost}/task/${taskId}`, "DELETE")
      .then((res) => {
        if (!res) return;
        dispatch({ type: actionTypes.DELETE_TASK, taskId, from });
        if (from === "single") {
          navigate("/");
        }
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function deleteTasks(navigate, taskIds) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    request(navigate, `${apiHost}/task`, "PATCH", {
      tasks: [...taskIds],
    })
      .then((res) => {
        if (!res) return;
        dispatch({ type: actionTypes.GROUP_DELETE_TASKS, taskIds });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function editTask(navigate, data, from) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    request(navigate, `${apiHost}/task/${data._id}`, "PUT", data)
      .then((editedTask) => {
        if (!editedTask) return;
        dispatch({
          type: actionTypes.EDIT_TASK,
          editedTask,
          from,
          status: data.status,
        });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function register(data, navigate) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    requestWithoutToken(`${apiHost}/user`, "POST", data)
      .then(() => {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
        });
        navigate("/login");
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function login(data, navigate) {
  return function (dispatch) {
    dispatch({ type: actionTypes.PENDING });
    requestWithoutToken(`${apiHost}/user/sign-in`, "POST", data)
      .then((res) => {
        saveToken(res);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
        });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ERROR, error: error.message });
      });
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOADING });
    const jwt = getLocalJWT();
    if (jwt) {
      request(`${apiHost}/user/sign-out`, "POST", { jwt })
        .then(() => {
          removeJWT();
          dispatch({ type: actionTypes.LOGOUT_SUCCESS });
          navigate("/login");
        })
        .catch((err) => {
          dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
        });
    } else {
      dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      navigate("/login");
    }
  };
}

export const createNavigatorAction = (navigate) => {
  return {
    type: actionTypes.CREATE_NAVIGATOR,
    payload: { navigate },
  };
};
