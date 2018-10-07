import { RESET_APP } from './orders'


// action constants
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CLEAR_CART = 'CLEAR_CART';


// action creators
const _addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const _removeProduct = product => {
  return {
    type: REMOVE_PRODUCT,
    product
  }
}

const _clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

const addQuantity = product => {

  if(product.quantity) {
    product.quantity++
  }
  else {
    product.quantity = 1
  }

  return product;
}

const removeQuantity = product => {
  product.quantity--
  return product;
}


// reducer
const cartReducer = (state = [], action) => {

  switch(action.type) {

    case ADD_PRODUCT:
      state = [...state.filter(product => product.id !== action.product.id), addQuantity(action.product)]
      break;

    case REMOVE_PRODUCT:
      // const firstMatch = state.find(product => product.id === action.product.id)
      // state = state.filter(item => item !== firstMatch)
      // const firstMatchIndex = state.indexOf(action.product);
      // state = {...state, products: [...state.products.filter((product, idx) => idx !== firstMatchIndex)] }
      // state = state.filter((product, idx) => idx !== firstMatchIndex)
      state = [...state.filter(product => product.id !== action.product.id), removeQuantity(action.product)]
      break;

    case CLEAR_CART:
    case RESET_APP:
      state = [];
      break;

  }

  return state.filter(item => item.quantity !== 0);
}

export {
  _addProduct,
  _removeProduct,
  _clearCart,
  cartReducer
}
