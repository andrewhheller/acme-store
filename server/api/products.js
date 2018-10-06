const express = require('express');
const router = express.Router();

const { Product } = require('../db').models;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(error => next(error))
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(error => next(error))
})




module.exports = router;
