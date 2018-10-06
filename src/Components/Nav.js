import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = () => {

  return (
    <ul>

      <li>Home</li>
      
      <Link to='/cart'>
        <li>Cart</li>
        </Link>
      
      <li>Orders</li>
    </ul>
  )

}

export default Nav;
