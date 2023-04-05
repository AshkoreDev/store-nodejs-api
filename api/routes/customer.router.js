const express = require('express');
const CustomerService = require('./../services/customer.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { idCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('./../schemas/customer.schema.js');


const customerRouter = express.Router();
const service = new CustomerService();


customerRouter.get('/', async (req, res, next) => {

  try {

    const customers = await service.find();

    res.status(201).json(customers);

  } catch (error) {

    next(error);
  }
});


customerRouter.get('/:customerId', 
  validatorHandler(idCustomerSchema, 'params'),
  async (req, res, next) => {

    const { customerId } =  req.params;

    try {

      const customer = await service.findOne(customerId);

      res.status(201).json(customer);

    } catch (error) {

      next(error);
    }
  }
);


customerRouter.post('/', 
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const customer = await service.create(body);

      res.status(201).json({ message: 'CUSTOMER CREATED', data: customer });

    } catch (error) {

      next(error);
    }
  }
);


customerRouter.patch('/:customerId', 
  validatorHandler(idCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {

    const { customerId } = req.params;
    const body = req.body;

    try {

      const customer = await service.update(customerId, body);

      res.json({ message: 'CUSTOMER UPDATED', data: customer });

    } catch (error) {

      next(error);
    }
  }
);


customerRouter.delete('/:customerId', 
  validatorHandler(idCustomerSchema, 'params'),
  async (req, res, next) => {

    const { customerId } = req.params;

    try {

      const customer = await service.delete(customerId);

      res.json({ message: 'CUSTOMER DELETED', customerId });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = customerRouter;