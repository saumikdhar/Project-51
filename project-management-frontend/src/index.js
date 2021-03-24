import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';
import assignUserReducer from './store/reducers/assignUser';
import scoreboardReducer from './store/reducers/scoreboard';
import editProjectReducer from './store/reducers/projects';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) ||
  compose;

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  assignUser: assignUserReducer,
  scoreboard: scoreboardReducer,
  project: editProjectReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
