import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

import { productsReducer } from './reducers/products';
import { cartReducer } from './reducers/orders';
// import { studentsReducer } from './reducers/students';



// ### application global state data structure ### 
// {
//   products: [],
//   cart: []
// }

const reducer = combineReducers({
  cart: cartReducer,
  products: productsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
