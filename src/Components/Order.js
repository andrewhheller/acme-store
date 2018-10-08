import React from 'react';


const Order = ({ order, products }) => {
  
  const findProductName = (products, id) => {
    return products.find(product => product.id === id)
      ? products.find(product => product.id === id).name
      : ''
  }

  return (
    <div key={order.id}>
      <br />
      <br />
      <p style={{ fontWeight: "bold", backgroundColor: "darkgray", width: "600px" }}>#{ order.id }</p>
      {
        order.lineItems.map(lineItem => {
          return (
            <ul className="list-group" key={lineItem.id}>
              <li className="list-group-item" >
                {findProductName(products, lineItem.productId)}
                <span className="alert alert-info" style={{ marginLeft: "10px" }}>{lineItem.quantity}</span>
              </li>
            </ul>
          )
        })
      }
    </div>
  )

}




export default Order;
