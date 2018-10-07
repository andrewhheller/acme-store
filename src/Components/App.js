import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store';
import { loadProducts } from '../reducers/products';

import Nav from './Nav';
import Header from './Header';
import Cart from './Cart';
import Orders from './Orders';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadProducts())
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Header />
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </div>
      </Router>
    )
  }

}


export default App;
