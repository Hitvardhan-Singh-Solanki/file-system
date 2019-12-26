import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './ReactotronConfig';
import Reactotron from './ReactotronConfig';
import './index.scss';
import reducer from './reducers';
import App from './App';

export const store = createStore(reducer, Reactotron.createEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
