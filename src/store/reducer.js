import * as actionTypes from "./actionTypes";

const defaultState = {
  tasks: [],
  task: null,
  addTaskSuccess: false,
  deleteTasksSuccess: false,
  editTasksSuccess: false,
  editSingleTaskSuccess: false,
  loading: false,
  successMessage: null,
  errorMessage: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.PENDING: {
      return {
        ...state,
        addTaskSuccess: false,
        deleteTasksSuccess: false,
        editTasksSuccess: false,
        loading: true,
        successMessage: null,
        errorMessage: null,
      };
    }

    case actionTypes.ERROR: {
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    }

    case actionTypes.GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    }

    case actionTypes.GET_SINGLE_TASK: {
      return {
        ...state,
        task: action.task,
        loading: false,
      };
    }

    case actionTypes.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
        loading: false,
        successMessage: "Task has been created successfully!",
      };
    }

    case actionTypes.DELETE_TASK: {
      const newTasks = state.tasks.filter(
        (task) => action.task._id !== action.taskId
      );
      return {
        ...state,
        tasks: newTasks,
        loading: false,
        successMessage: "Task has been deleted successfully!",
      };
    }

    case actionTypes.GROUP_DELETE_TASKS: {
      const newTasks = state.tasks.filter((task) => {
        if (action.taskIds.has(task._id)) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        tasks: newTasks,
        deleteTasksSuccess: true,
        loading: false,
        successMessage: "Tasks has been deleted successfully!",
      };
    }

    case actionTypes.EDIT_TASK: {
      if(action.from === "single") {
        return {
          ...state,
          task: action.editedTask,
          editSingleTaskSuccess: true,
          loading: false,
          successMessage: "Task has been edited successfully!",
        };
      }

      const tasks = [...state.tasks];
      const foundIndex = tasks.findIndex(
        (task) => task._id === action.editedTask._id
      );
      tasks[foundIndex] = action.editedTask;

      return {
        ...state,
        tasks,
        editTasksSuccess: true,
        loading: false,
        successMessage: "Task has been edited successfully!",
      };
    }
    default:
      return state;
  }
}
