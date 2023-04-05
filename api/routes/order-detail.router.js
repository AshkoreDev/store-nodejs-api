const express = require('express');
const OrderDetailService = require('./../services/order-detail.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { idOrderDetailSchema, createOrderDetailSchema, updateOrderDetailSchema } = require('./../schemas/order-detail.schema.js');


const orderDetailRouter = express.Router();
const service = new OrderDetailService();


orderDetailRouter.get('/:itemId', 
  validatorHandler(idOrderDetailSchema, 'params'),
  async (req, res, next) => {

    const { itemId } =  req.params;

    try {

      const orderDetail = await service.findOne(itemId);

      res.status(201).json(orderDetail);

    } catch (error) {

      next(error);
    }
  }
);

orderDetailRouter.post('/', 
  validatorHandler(createOrderDetailSchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const orderDetail = await service.addItem(body);

      res.status(201).json({ message: 'ITEM ADDED', data: orderDetail });

    } catch (error) {

      next(error);
    }
  }
);


orderDetailRouter.patch('/:itemId', 
  validatorHandler(idOrderDetailSchema, 'params'),
  validatorHandler(updateOrderDetailSchema, 'body'),
  async (req, res, next) => {

    const { itemId } = req.params;
    const body = req.body;

    try {

      const orderDetail = await service.update(itemId, body);

      res.json({ message: 'ITEM UPDATED', data: orderDetail });

    } catch (error) {

      next(error);
    }
  }
);


orderDetailRouter.delete('/:itemId', 
  validatorHandler(idOrderDetailSchema, 'params'),
  async (req, res, next) => {

    const { itemId } = req.params;

    try {

      await service.delete(itemId);

      res.json({ message: 'ITEM DELETED', itemId });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = orderDetailRouter;