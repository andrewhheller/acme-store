import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ cartCount, orderCount }) => {

  return (
    <ul>

      <Link to="/">
        <li>Home</li>
      </Link>
      
      <Link to='/cart'>
        <li>Cart ({ cartCount })</li>
      </Link>
      
      <Link to="/orders">
        <li>Orders ({ orderCount })</li>
      </Link>

    </ul>
  )

}

const cartCount = (cart) => {
  return cart.reduce((count, product) => {
    if(product.quantity) {
      count += product.quantity
    }
    return count;
  }, 0)
}

const mapStateToProps = ({ cart, orders }) => {
 
  return {
    cartCount: cartCount(cart),
    orderCount: orders.length
  }

}

export default connect(mapStateToProps)(Nav);
