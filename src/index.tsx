import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StoreState from './types/StoreState';
import { todo } from './reducers';

import './index.css';
const enhancer = compose(persistState());
const store = createStore<StoreState>(
  todo, {
    todos: []
  },
  enhancer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
