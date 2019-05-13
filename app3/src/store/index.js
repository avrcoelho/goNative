// essa função vai criar o estado global
import { createStore, compose, applyMiddleware } from 'redux';
import todos from './reducers/todo';

const composer = __DEV__
  ? compose(
    applyMiddleware(...[]),
    console.tron.createEnhancer(),
  )
  : applyMiddleware(...[]);

const store = createStore(todos, composer);

export default store;
