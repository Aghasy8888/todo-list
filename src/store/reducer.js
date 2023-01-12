import * as actionTypes from "./actionTypes";

const defaultState = {
  tasks: [],
  addTaskSuccess: false,
  deleteTasksSuccess: false,
  editTasksSuccess: false,
  loading: false,
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
      };
    }

    case actionTypes.GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    }

    case actionTypes.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
        loading: false,
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
      };
    }

    case actionTypes.EDIT_TASK: {
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
      };
    }
    default:
      return state;
  }
}
