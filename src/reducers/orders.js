import axios from 'axios';


// action constants
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

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
 
// thunks


// reducer
const cartReducer = (state = [], action) => {

  switch(action.type) {

    case ADD_PRODUCT:
      state = [...state, action.product];
      break;

    case REMOVE_PRODUCT:
      // const firstMatch = state.find(product => product.id === action.product.id)
      // state = state.filter(item => item !== firstMatch)
      const firstMatchIndex = state.indexOf(action.product);
      state = state.filter((product, idx) => idx !== firstMatchIndex)
      break;

  }

  return state;
}

export {
  _addProduct,
  _removeProduct,
  cartReducer
}
