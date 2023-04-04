const express = require('express');
const UserService = require('./../services/user.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { idUserSchema, createUserSchema, updateUserSchema } = require('./../schemas/user.schema.js');


const userRouter = express.Router();
const service = new UserService();


userRouter.get('/', async (req, res, next) => {

  try {

    const users = await service.find();

    res.status(201).json(users);

  } catch (error) {

    next(error);
  }
});


userRouter.get('/:id', 
  validatorHandler(idUserSchema, 'params'),
  async (req, res, next) => {

    const { id } =  req.params;

    try {

      const user = await service.findOne(id);

      res.status(201).json(user);

    } catch (error) {

      next(error);
    }
  }
);


userRouter.post('/', 
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const user = await service.create(body);

      res.status(201).json({ message: 'created', data: user });

    } catch (error) {

      next(error);
    }
  }
);


userRouter.patch('/:id', 
  validatorHandler(idUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;

    try {

      const user = await service.update(id, body);

      res.json({ message: 'updated', data: user, id });

    } catch (error) {

      next(error);
    }
  }
);


userRouter.delete('/:id', 
  validatorHandler(idUserSchema, 'params'),
  async (req, res, next) => {

    const { id } = req.params;

    try {

      const user = await service.delete(id);

      res.json({ message: 'deleted', id });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = userRouter;