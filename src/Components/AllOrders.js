import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import store from '../store';
import { getOrders } from '../reducers/orders';

import Order from './Order';

class AllOrders extends Component {

  componentDidMount() {
    store.dispatch(getOrders());
  }

  render() {
    const { orders, products } = this.props;
  
    return (
      <div>
        <h1>All Orders</h1>

        <Link to="/orders">
          <button className="btn btn-success" >Current Orders</button>
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
};

const mapStateToProps = ({ orders, products }) => {
  return {
    orders,
    products
  }
}


export default connect(mapStateToProps)(AllOrders);
