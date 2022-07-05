import { ActionInterface, TASK } from '../../Types';
import * as TaskActionsTypes from '../Actions/TaskActionsTypes';

const initialTaskState: TASK[] = [];
const initialState: any = { tasks: initialTaskState };

const TaskDispatchs = (state: any = initialState, action: ActionInterface) => {
  switch (action.type) {
    case TaskActionsTypes.TASK_ADD:
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case TaskActionsTypes.TASK_EDIT:
      return {
        ...state,
        tasks: state.tasks.map((task: TASK) => {
          if (task.id === action.payload?.id) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    case TaskActionsTypes.TASK_REMOVE:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task: TASK) => task.id !== action.payload?.id
        ),
      };
    case TaskActionsTypes.TASK_GET:
      return {
        ...state,
        task: state.tasks.filter(
          (task: TASK) => task.id === action.payload?.id
        ),
      };
    default:
      return state;
  }
};

export default TaskDispatchs;
