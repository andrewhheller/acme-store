const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const apiProducts = require('./api/products');
const apiOrders = require('./api/orders');

app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.use('/api/products', apiProducts);
app.use('/api/orders', apiOrders);



const index = path.join(__dirname, '..', 'index.html');
const errorPage = path.join(__dirname, '..', '404.html')

app.get('/', (req, res, next) => {
  res.sendFile(index);
});


app.use((req, res, next) => {
  res.status(404).sendFile(errorPage)
});

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).send('<h1>There was an Error</h1')
})




module.exports = app;
