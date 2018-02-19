import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reduxThunk from 'redux-thunk'
import reducer from './reducers/index'
import promiseMiddleware from 'redux-promise-middleware'
import { AUTHENTICATED } from './actions/index';



const store = createStore(reducer,{},applyMiddleware(reduxThunk,promiseMiddleware()));

const user = localStorage.getItem('user');

if(user) {
store.dispatch({ type: AUTHENTICATED });
}


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
