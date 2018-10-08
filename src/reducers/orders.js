import axios from 'axios';

import { removeQuantity, recentOrders } from '../utils';

import { _clearCart } from './cart';

// action constants
const GET_ORDERS = 'GET_ORDERS';
const RESET_APP = 'RESET_APP';

// action creators
const _getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const _resetApp = () => {
  return {
    type: RESET_APP
  }
}


// thunks
const getOrders = () => {
  return (dispatch) => {
     axios.get('/api/orders')
      .then(response => response.data)
      .then(orders => dispatch(_getOrders(orders)))
      .catch(error => console.log(error))
  }
}

const resetApp = (products) => {
  return (dispatch) => {
    dispatch(_resetApp())
    removeQuantity(products);
    recentOrders.splice(0, recentOrders.length) // clear recentOrders array
  }
}





const createOrder = (cart, products) => {

  return (dispatch) => {

    // create a new order in database
    return axios.post('/api/orders')

      // data from response will be used to determine orderId
      .then(response => response.data)
      
      .then(order => {

        recentOrders.push(order.id);

        // for each product in cart
        cart.forEach(item => {

          // create an object to send to database,
          // that includes productId and quantity
          const lineItem = { productId: item.id, quantity: item.quantity }

          // POST object to lineItems table
          axios.post(`/api/orders/${order.id}/lineItems/`, lineItem)
        })

      })

      // get all orders from the DB
      .then(() => dispatch(getOrders()))

      // reload products to wipe out quantity key (UGH)
      // .then(() => dispatch(loadProducts()))
      .then(() => removeQuantity(products))

      // clear the cart
      .then(() => dispatch(_clearCart()))

      // catch any errors
      .catch(error => console.log(error))
  }

}



// reducer
const orderReducer = (state = [], action) => {

  switch(action.type) {

    case GET_ORDERS:
      state = action.orders;
      break;

    case RESET_APP:
      state = [];
      break;
  }

  return state;
}


export {
  orderReducer,
  getOrders,
  createOrder,
  RESET_APP,
  resetApp
}
