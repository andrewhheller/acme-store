import React from 'react';


const Order = ({ order, products }) => {
  
  const findProductName = (products, id) => {
    return products.find(product => product.id === id).name
  }

  return (
    <div key={order.id}>
      <p>#{ order.id }</p>
      {
        order.lineItems.map(lineItem => {
          return (
            <ul key={lineItem.id}>
              <li>{findProductName(products, lineItem.productId)}</li>
              <li>quantity: {lineItem.quantity}</li>
            </ul>
          )
        })
      }
    </div>
  )

}




export default Order;
