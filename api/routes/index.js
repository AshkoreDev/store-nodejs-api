const express = require('express');
const userRouter = require('./user.router.js');
const customerRouter = require('./customer.router.js');



function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRouter);
  router.use('/customers', customerRouter);
  
};


module.exports = routerApi;