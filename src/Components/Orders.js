import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { recentOrders } from '../utils';

import store from '../store';
import { getOrders } from '../reducers/orders';

import Order from './Order';



class Orders extends Component {

  componentDidMount() {
    store.dispatch(getOrders())
  }

  render() {
    const { orders, products } = this.props;

    return (
      <div>
        <h1>Current Orders</h1>

        <Link to="/all-orders">
          <button className="btn btn-success">All Orders</button>
        </Link>

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

}

const mapStateToProps = ({ orders, products }) => {

  return {
    orders: orders.filter(order => recentOrders.includes(order.id)),
    products
  }

}


export default connect(mapStateToProps)(Orders);
