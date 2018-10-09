import React from 'react';
import { connect } from 'react-redux';

import { removeQuantity } from '../utils';

import CartLineItem from './CartLineItem';

import { createOrder, getOrders } from '../reducers/orders';
import { _clearCart } from '../reducers/cart';

const Cart = ({ products, cart, onCreateOrder }) => {

  return (
    <div>
      <h1>Products</h1>
      <ul className='list-group'>
        {
          products.map(product => <CartLineItem key={product.id} product={product}/>)
        }
      </ul>
      <button className="btn btn-danger" disabled={!cart.length} onClick={() => onCreateOrder(cart, products)}>Create Order</button>
      <br />
      <br />
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
      dispatch(createOrder(cart, products)) // post orders to DB
        .then(() => history.push('/orders')) // redirect to /orders
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart); 
