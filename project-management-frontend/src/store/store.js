import { createStore, applyMiddleware } from "redux";
import businessCases from '../store/reducers/projects';
import thunk from 'redux-thunk';

export default () => {
  return createStore(businessCases, applyMiddleware(thunk));
};