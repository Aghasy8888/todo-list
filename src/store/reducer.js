import * as actionTypes from './actionTypes';
import * as userActionTypes from './userActionTypes';
import { checkLoginStatus } from '../helpers/auth';

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
  isAuthenticated: checkLoginStatus(),
  navigate: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.PENDING: {
      return {
        ...state,
        addTaskSuccess: false,
        deleteTasksSuccess: false,
        editTasksSuccess: false,
        editSingleTaskSuccess: false,
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
        successMessage: 'Task has been created successfully!',
      };
    }

    case actionTypes.DELETE_TASK: {
      if (action.from === 'single') {
        return {
          ...state,
          task: null,
          loading: false,
          successMessage: 'Task has been deleted successfully!',
        };
      }

      const newTasks = state.tasks.filter((task) => task._id !== action.taskId);
      return {
        ...state,
        tasks: newTasks,
        loading: false,
        successMessage: 'Task has been deleted successfully!',
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
        successMessage: 'Tasks has been deleted successfully!',
      };
    }

    case actionTypes.EDIT_TASK: {
      let successMessage = 'Task has been edited successfully!';

      if (action.status) {
        if (action.status === 'done') {
          successMessage = 'Congrats, you have completed this task!';
        } else {
          successMessage = 'This task is active now.';
        }
      }

      if (action.from === 'single') {
        return {
          ...state,
          task: action.editedTask,
          editSingleTaskSuccess: true,
          loading: false,
          successMessage: successMessage,
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
        successMessage: successMessage,
      };
    }

    case userActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: 'Congrats, you have been registered successfully!',
      };
    }

    case userActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    }

    case userActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    }

    case userActionTypes.AUTH_LOADING:
      return { ...state, loading: true, successMessage: null, error: null };

    case userActionTypes.AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actionTypes.CREATE_NAVIGATOR: {
      return {
        ...state,
        navigate: action.payload.navigate, 
      };
    }
    

    default:
      return state;
  }
}
