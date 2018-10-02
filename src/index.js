import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import store from './store';

import App from './Components/App';


const obj = {
  name: 'Andrew'
}

const obj1 = {...obj}

console.log(obj1)

const root = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>
, root);
