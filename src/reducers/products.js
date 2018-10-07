import axios from 'axios';


// action constants
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

// action creators
const _loadProducts = products => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
}


// thunks
const loadProducts = () => {
  return (dispatch) => {
    axios.get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(_loadProducts(products)))
      .catch(error => console.log(error))
  }
}



// reducers
const productsReducer = (state = [], action) => {

  switch(action.type) {
    case LOAD_PRODUCTS:
      state = action.products
  }

  return state.sort((a, b) => a.name > b.name);
}


export {
  productsReducer,
  loadProducts
}
