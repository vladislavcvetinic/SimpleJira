import { applyMiddleware, createStore } from 'redux';
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
  withReduxStateSync,
} from 'redux-state-sync';

import TaskDispatchs from './Reducers/TaskReducer';

const middlewares = [createStateSyncMiddleware()];
const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e: any) {
    alert(e.toString());
  }
};
const getInitialStoreState = () =>
  (localStorage.getItem('state') as string)
    ? JSON.parse(localStorage.getItem('state') as string)
    : { tasks: [] };
const Store = createStore(
  withReduxStateSync(TaskDispatchs),
  getInitialStoreState(),
  applyMiddleware(...middlewares)
);

initStateWithPrevTab(Store);
Store.subscribe(() => {
  saveToLocalStorage(Store.getState());
});

export default Store;
