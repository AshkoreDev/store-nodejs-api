const express = require('express');
const roleRouter = require('./role.router.js');
const userRouter = require('./user.router.js');
const customerRouter = require('./customer.router.js');
const categoryRouter = require('./category.router.js');
const productRouter = require('./product.router.js');
const orderRouter = require('./order.router.js');


function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/roles', roleRouter);
  router.use('/users', userRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoryRouter);
  router.use('/products', productRouter);
  router.use('/orders', orderRouter);
};


module.exports = routerApi;