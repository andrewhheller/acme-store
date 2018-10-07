import React from 'react';
import { connect } from 'react-redux';

import { resetApp } from '../reducers/orders';



const Header = ({ products, totalSales, onResetApp }) => {
  return(
    <div>
      <h3>({ totalSales }) Items Sold</h3>
      <button onClick={() => onResetApp(products)} >Reset</button>
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

const mapStateToProps = ({ orders, products }) => {
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
