import React from 'react';
import { connect } from 'react-redux';

import { _addProduct, _removeProduct } from '../reducers/cart';

const CartLineItem = ({ cart, product, onAddProduct, onRemoveProduct }) => {

  const count = () => {
    return cart.find(item => item.id === product.id)
      ? cart.find(item => item.id === product.id).quantity
      : 0
  }

    return (
      <li>
        {product.name}
        <br />
        ({count()}) ordered
        <br />
        <button disabled={!count()} onClick={() => onRemoveProduct(product)}>-</button>
        <button onClick={() => onAddProduct(product)}>+</button>
        <br />
        <br />
      </li>
    )

}

const mapStateToProps = ({ cart }, { product }) => {

  return {
    product,
    cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: (product) => dispatch(_addProduct(product)),
    onRemoveProduct: (product) => dispatch(_removeProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartLineItem);
