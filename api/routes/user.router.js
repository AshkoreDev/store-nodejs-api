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


userRouter.get('/:userId', 
  validatorHandler(idUserSchema, 'params'),
  async (req, res, next) => {

    const { userId } =  req.params;

    try {

      const user = await service.findOne(userId);

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


userRouter.patch('/:userId', 
  validatorHandler(idUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {

    const { userId } = req.params;
    const body = req.body;

    try {

      const user = await service.update(userId, body);

      res.json({ message: 'User Updated', data: user });

    } catch (error) {

      next(error);
    }
  }
);


userRouter.delete('/:userId', 
  validatorHandler(idUserSchema, 'params'),
  async (req, res, next) => {

    const { userId } = req.params;

    try {

      const user = await service.delete(userId);

      res.json({ message: 'deleted', userId });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = userRouter;