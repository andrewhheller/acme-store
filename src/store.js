import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

import { productsReducer } from './reducers/products';
import { cartReducer } from './reducers/cart';
import { orderReducer } from './reducers/orders';



// ### application global state data structure ### 
// {
//   products: [ { id: 1, name: 'widget1' },
//               { id: 2, name: 'widget2' },
//               { id: 3, name: 'widget3' },
//              ],
//   cart:     [ { id: 1, name: 'widget1', quantity: 1 },
//               { id: 2, name: 'widget2', quantity: 3 },
//               { id: 3, name: 'widget3', quantity: 5 },
//              ],
//   orders:   [
//               {
//                 orderId: '',
//                 products: [
//                   { id: 1, name: 'widget1', quantity: 1 },
//                   { id: 2, name: 'widget2', quantity: 3 },
//                   { id: 3, name: 'widget3', quantity: 5 },
//                 ],
//               }
//              ]
// }

const reducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  orders: orderReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
