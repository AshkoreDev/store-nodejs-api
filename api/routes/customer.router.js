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


customerRouter.get('/:id', 
  validatorHandler(idCustomerSchema, 'params'),
  async (req, res, next) => {

    const { id } =  req.params;

    try {

      const customer = await service.findOne(id);

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

      res.status(201).json({ message: 'created', data: customer });

    } catch (error) {

      next(error);
    }
  }
);


customerRouter.patch('/:id', 
  validatorHandler(idCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;

    try {

      const customer = await service.update(id, body);

      res.json({ message: 'updated', data: customer, id });

    } catch (error) {

      next(error);
    }
  }
);


customerRouter.delete('/:id', 
  validatorHandler(idCustomerSchema, 'params'),
  async (req, res, next) => {

    const { id } = req.params;

    try {

      const customer = await service.delete(id);

      res.json({ message: 'deleted', id });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = customerRouter;