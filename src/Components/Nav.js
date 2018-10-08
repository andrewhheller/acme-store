import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { recentOrders, toggleOrders } from '../utils';

const Nav = ({ cartCount, orderCount }) => {

  return (
    <ul className="nav nav-tabs nav-fill">

      <Link className="nav-link" to="/">
        <li className="nav-item active">Home</li>
      </Link>
      
      <Link className="nav-link" to='/cart'>
        <li className="nav-item">Cart ({ cartCount })</li>
      </Link>
      
      <Link className="nav-link" to="/orders">
        <li className="nav-item">Orders ({ orderCount })</li>
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

const mapStateToProps = ({ cart, orders }, { location }) => {

  // if on orders or cart page, caclulate orders based only on CURRENT orders,
  // if on all-orders page, caclulate orders based only on ALL orders
  orders = toggleOrders(orders, location)


  return {
    cartCount: cartCount(cart),
    orderCount: orders.length
  }

}

export default connect(mapStateToProps)(Nav);
