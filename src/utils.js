// a product object from the products array is added to the cart
// when quantity key is added in helper function for cart reducer,
// it adds a quantity key for that object with points to the product object,
// thus adding a quantity key in the products arrary! (side effect)
// this removes all quantities when either creating an order or resetting application
const removeQuantity = products => {
  products.forEach(product => delete product.quantity)
}


export {
  removeQuantity
}
