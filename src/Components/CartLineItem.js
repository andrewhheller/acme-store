import React from 'react';
import { connect } from 'react-redux';

import { _addProduct, _removeProduct } from '../reducers/orders';

const CartLineItem = ({ product, count, onAddProduct, onRemoveProduct }) => {

    return (
      <li>
        {product.name}
        <br />
        ({count}) ordered
        <br />
        <button disabled={!count} onClick={() => onRemoveProduct(product)}>-</button>
        <button onClick={() => onAddProduct(product)}>+</button>
        <br />
        <br />
      </li>
    )

}

const mapStateToProps = ({ cart }, { product }) => {
  return {
    product,
    count: cart.filter(item => item.id === product.id).length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: (product) => dispatch(_addProduct(product)),
    onRemoveProduct: (product) => dispatch(_removeProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartLineItem);
