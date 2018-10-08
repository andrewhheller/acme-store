import React from 'react';
import { connect } from 'react-redux';

import { resetApp } from '../reducers/orders';

import { recentOrders, toggleOrders } from '../utils';




const Header = ({ products, totalSales, onResetApp }) => {
  return(
    <div>
      <br />
      <div className="alert alert-success" style={{ width: "300px" }}>
        <h5 className="alert-heading">{ totalSales } Items Sold</h5>
      </div>
      <button className="btn btn-warning" onClick={() => onResetApp(products)} >Reset</button>
      <br />
      <br />
    </div>
  )
}

const totalSales = orders => {

  // reduce on complete order array (array of order objects)
  return orders.reduce((total, order) => {

    // for each product in products array within order
    // add quantity to total
    order.lineItems.forEach(lineItem => total += lineItem.quantity)
    return total;

  // start with 0 as default
  }, 0)

}

const mapStateToProps = ({ orders, products }, { location } ) => {

  // if on orders or cart page, caclulate orders based only on CURRENT orders,
  // if on all-orders page, caclulate orders based only on ALL orders,
  orders = toggleOrders(orders, location)

  return {
    totalSales: totalSales(orders),
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetApp: (products) => dispatch(resetApp(products))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
