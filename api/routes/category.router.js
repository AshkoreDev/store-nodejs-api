const express = require('express');
const CategoryService = require('./../services/category.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { idCategorySchema, createCategorySchema, updateCategorySchema } = require('./../schemas/category.schema.js');


const categoryRouter = express.Router();
const service = new CategoryService();


categoryRouter.get('/', async (req, res, next) => {

  try {

    const categories = await service.find();

    res.status(201).json(categories);

  } catch (error) {

    next(error);
  }
});


categoryRouter.get('/:categoryId', 
  validatorHandler(idCategorySchema, 'params'),
  async (req, res, next) => {

    const { categoryId } =  req.params;

    try {

      const category = await service.findOne(categoryId);

      res.status(201).json(category);

    } catch (error) {

      next(error);
    }
  }
);


categoryRouter.post('/', 
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const category = await service.create(body);

      res.status(201).json({ message: 'Category Created', data: category });

    } catch (error) {

      next(error);
    }
  }
);


categoryRouter.patch('/:categoryId', 
  validatorHandler(idCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {

    const { categoryId } = req.params;
    const body = req.body;

    try {

      const category = await service.update(categoryId, body);

      res.json({ message: 'Category Updated', data: category });

    } catch (error) {

      next(error);
    }
  }
);


categoryRouter.delete('/:categoryId', 
  validatorHandler(idCategorySchema, 'params'),
  async (req, res, next) => {

    const { categoryId } = req.params;

    try {

      const category = await service.delete(categoryId);

      res.json({ message: 'Category Deleted', categoryId });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = categoryRouter;