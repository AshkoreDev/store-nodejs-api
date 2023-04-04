const express = require('express');
const userRouter = require('./user.router.js');
const customerRouter = require('./customer.router.js');
const categoryRouter = require('./category.router.js');
const productRouter = require('./product.router.js');


function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoryRouter);
  router.use('/products', productRouter);
  
};


module.exports = routerApi;