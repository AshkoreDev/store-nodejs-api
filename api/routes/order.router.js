const express = require('express');
const OrderService = require('./../services/order.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { idOrderSchema, createOrderSchema, updateOrderSchema } = require('./../schemas/order.schema.js');


const orderRouter = express.Router();
const service = new OrderService();


orderRouter.get('/', async (req, res, next) => {

  try {

    const orders = await service.find();

    res.status(201).json(orders);

  } catch (error) {

    next(error);
  }
});


orderRouter.get('/:orderId', 
  validatorHandler(idOrderSchema, 'params'),
  async (req, res, next) => {

    const { orderId } =  req.params;

    try {

      const order = await service.findOne(orderId);

      res.status(201).json(order);

    } catch (error) {

      next(error);
    }
  }
);


orderRouter.get('/my-orders/:customerId', 
  // validatorHandler(idOrderSchema, 'params'),
  async (req, res, next) => {

    const { customerId } =  req.params;

    try {

      const orders = await service.findByUser(customerId);

      res.status(201).json(orders);

    } catch (error) {

      next(error);
    }
  }
);


orderRouter.post('/', 
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const order = await service.create(body);

      res.status(201).json({ message: 'ORDER CREATED', data: order });

    } catch (error) {

      next(error);
    }
  }
);


orderRouter.patch('/:orderId', 
  validatorHandler(idOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {

    const { orderId } = req.params;
    const body = req.body;

    try {

      const order = await service.update(orderId, body);

      res.json({ message: 'ORDER UPDATED', data: order });

    } catch (error) {

      next(error);
    }
  }
);


orderRouter.delete('/:orderId', 
  validatorHandler(idOrderSchema, 'params'),
  async (req, res, next) => {

    const { orderId } = req.params;

    try {

      await service.delete(orderId);

      res.json({ message: 'ORDER DELETED', orderId });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = orderRouter;