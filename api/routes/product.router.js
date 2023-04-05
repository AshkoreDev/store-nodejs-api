const express = require('express');
const ProductService = require('../services/product.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { queryProductSchema, idProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema.js');


const productRouter = express.Router();
const service = new ProductService();


productRouter.get('/', 
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {

    const { limit, offset } = req.query;
    
    try {

      const products = await service.find(limit, offset);

      res.status(201).json(products);

    } catch (error) {

      next(error);
    }
  }
);


productRouter.get('/:productId', 
  validatorHandler(idProductSchema, 'params'),
  async (req, res, next) => {

    const { productId } =  req.params;

    try {

      const product = await service.findOne(productId);

      res.status(201).json(product);

    } catch (error) {

      next(error);
    }
  }
);


productRouter.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const product = await service.create(body);

      res.status(201).json({ message: 'Product Created', data: product });

    } catch (error) {

      next(error);
    }
  }
);


productRouter.patch('/:productId', 
  validatorHandler(idProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

    const { productId } = req.params;
    const body = req.body;

    try {

      const product = await service.update(productId, body);

      res.json({ message: 'Product Updated', data: product });

    } catch (error) {

      next(error);
    }
  }
);


productRouter.delete('/:productId', 
  validatorHandler(idProductSchema, 'params'),
  async (req, res, next) => {

    const { productId } = req.params;

    try {

      const product = await service.delete(productId);

      res.json({ message: 'Product Deleted', productId });
    } catch (error) {

      next(error);
    }
  }
);


module.exports = productRouter;