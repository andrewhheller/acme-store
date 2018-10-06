import React from 'react';
import { connect } from 'react-redux';

import CartLineItem from './CartLineItem';

const Cart = ({ products}) => {

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {
          products.map(product => <CartLineItem key={product.id} product={product}/>)
        }
      </ul>
    </div>
  )

}

const mapStateToProps = ({ products }) => {

  return {
    products
  }

}



export default connect(mapStateToProps)(Cart); 
