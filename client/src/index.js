import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reduxThunk from 'redux-thunk'
import reducer from './reducers/index'
import promiseMiddleware from 'redux-promise-middleware'




const store = createStore(reducer,{},applyMiddleware(reduxThunk,promiseMiddleware));


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
