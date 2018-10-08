const conn = require('./conn');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');


// associations
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);

Order.hasMany(LineItem);

// sync and seed
const syncAndSeed = () => {
  let widget1, widget2, widget3;
  let order1;
  let lineItem1, lineItem2, lineItem3;

  return conn.sync({ force: true } )
    .then(() => {
      return Promise.all([
        Product.create({
          name: 'widget1'
        }),
        Product.create({
          name: 'widget2'
        }),
        Product.create({
          name: 'widget3'
        })
      ])
    })
    // .then( async ([widget1, widget2, widget3]) => {
    //   order1 = await Order.create();
    //   lineItem1 = await LineItem.create({
    //       orderId: order1.id,
    //       productId: widget1.id
    //     })
    //   lineItem2 = await LineItem.create({
    //     orderId: order1.id,
    //     productId: widget2.id,
    //     quantity: 3
    //   })
    //   lineItem3 = await LineItem.create({
    //     orderId: order1.id,
    //     productId: widget3.id,
    //     quantity: 5
    //   })
    //   lineItem4 = await LineItem.create({
    //     orderId: order1.id,
    //     productId: widget1.id
    //   })
    // })
    .catch(error => console.log(error));

}



module.exports = {
  syncAndSeed,
  models: {
    Product,
    Order,
    LineItem
  }
}
