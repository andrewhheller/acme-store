const express = require('express');
const router = express.Router({ mergeParams: true });

const { Order, LineItem } = require('../db').models;



router.get('/', async (req, res, next) => {
  
  const attr = {
    status: 'CART'
  }

  try {
    let cart = await Order.findOne({ where: attr })
    if(!cart) {
      cart = await Order.create(attr)
    }
    const orders = await Order.findAll({
      include: [ LineItem ],
      order: [ [ 'createdAt', 'DESC' ] ]
    })
    res.send(orders)
  }
  catch (error) {
    next(error)
  }

})

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(error => next(error))
})

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(error => next(error))
})

router.post('/:orderId/lineItems', (req, res, next) => {
  LineItem.create({
      orderId: req.params.orderId,
      quantity: req.body.quantity,
      productId: req.body.productId
  })
    .then(lineItem => res.send(lineItem))
    .catch(error => next(error))
})

router.put('/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(error => next(error))
})

router.delete('/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(error => next(error))
})



module.exports = router;
