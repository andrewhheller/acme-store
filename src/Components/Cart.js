import React from 'react';
import { connect } from 'react-redux';

import CartLineItem from './CartLineItem';

import { createOrder } from '../reducers/orders';

const Cart = ({ products, cart, onCreateOrder }) => {

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {
          products.map(product => <CartLineItem key={product.id} product={product}/>)
        }
      </ul>
      <button disabled={!cart.length} onClick={() => onCreateOrder(cart, products)}>Create Order</button>
    </div>
  )

}

const mapStateToProps = ({ products, cart }) => {

  return {
    products,
    cart
  }

}

const mapDispatchToProps = (dispatch, { history }) => {

  return {
    onCreateOrder: (cart, products) => {
      dispatch(createOrder(cart, products))
        .then(() => history.push('/orders'))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart); 
