const defaultState = {
  tasks: [],
  addTaskSuccess: false,
  deleteTasksSuccess: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "INCREMENT": {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        count: state.count - 1,
      };
    }

    case "GET_TASKS": {
      return {
        ...state,
        tasks: action.tasks,
      };
    }

    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
      };
    }

    case "ADDING_TASK": {
      return {
        ...state,
        addTaskSuccess: false,
      };
    }

    case "DELETE_TASK": {
      const newTasks = state.tasks.filter(
        (task) => action.task._id !== action.taskId
      );
      return {
        ...state,
        tasks: newTasks,
      };
    }

    case "DELETE_TASKS": {
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
      };
    }

    case "DELETING_TASKS": {
      return {
        ...state,
        deleteTasksSuccess: false,
      };
    }

    default:
      return state;
  }
}
