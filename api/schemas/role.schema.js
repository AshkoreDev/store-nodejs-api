const Joi = require('joi');

const roleId = Joi.number().integer();

const title = Joi.string().min(1).max(20);

const description = Joi.string().min(1).max(50);

const active = Joi.number().integer().min(0).max(1);


const idRoleSchema = Joi.object({
  roleId: roleId.required()
});

const createRoleSchema = Joi.object({
  title: title.required(),
  description: description.required(),
});

const updateRoleSchema = Joi.object({
  title: title,
  description: description,
  active: active
});

module.exports = { idRoleSchema, createRoleSchema, updateRoleSchema };