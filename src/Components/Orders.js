import React from 'react';
import { connect } from 'react-redux';

import Order from './Order';


const Orders = ({ orders, products }) => {

  return (
    <div>
      <h1>Current Orders</h1>
      {
        orders.map(order => {
          return (
            <Order key={order.id} products={products} order={order}/>
          )
        })
      }
    </div>
  )

}

const mapStateToProps = ({ orders, products }) => {

  return {
    orders,
    products
  }

}


export default connect(mapStateToProps)(Orders);
