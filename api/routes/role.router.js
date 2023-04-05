const express = require('express');
const RoleService = require('./../services/role.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { idRoleSchema, createRoleSchema, updateRoleSchema } = require('./../schemas/role.schema.js');


const roleRouter = express.Router();
const service = new RoleService();


roleRouter.get('/', async (req, res, next) => {

  try {

    const roles = await service.find();

    res.status(201).json(roles);

  } catch (error) {

    next(error);
  }
});


roleRouter.get('/:roleId', 
  validatorHandler(idRoleSchema, 'params'),
  async (req, res, next) => {

    const { roleId } =  req.params;

    try {

      const role = await service.findOne(roleId);

      res.status(201).json(role);

    } catch (error) {

      next(error);
    }
  }
);


roleRouter.post('/', 
  validatorHandler(createRoleSchema, 'body'),
  async (req, res, next) => {

    const body = req.body;

    try {

      const role = await service.create(body);

      res.status(201).json({ message: 'ROLE CREATED', data: role });

    } catch (error) {

      next(error);
    }
  }
);


roleRouter.patch('/:roleId', 
  validatorHandler(idRoleSchema, 'params'),
  validatorHandler(updateRoleSchema, 'body'),
  async (req, res, next) => {

    const { roleId } = req.params;
    const body = req.body;

    try {

      const role = await service.update(roleId, body);

      res.json({ message: 'ROLE UPDATED', data: role });

    } catch (error) {

      next(error);
    }
  }
);


roleRouter.delete('/:roleId', 
  validatorHandler(idRoleSchema, 'params'),
  async (req, res, next) => {

    const { roleId } = req.params;

    try {

      await service.delete(roleId);

      res.json({ message: 'ROLE DELETED', roleId });

    } catch (error) {

      next(error);
    }
  }
);


module.exports = roleRouter;