const Joi = require('joi');

const userId = Joi.number().integer();

const email = Joi.string().email();

const username = Joi.string().min(1).max(20);

const password = Joi.string().min(8).max(20);

const roleId = Joi.number().integer();

const recoveryToken = Joi.string();

const active = Joi.string().min(1).max(1);


const idUserSchema = Joi.object({
  userId: userId.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  username: username.required(),
  password: password.required(),
  roleId: roleId.required()
});

const updateUserSchema = Joi.object({
  email: email,
  username: username,
  password: password,
  roleId: roleId,
  recoveryToken: recoveryToken,
  active: active
});


module.exports = { idUserSchema, createUserSchema, updateUserSchema }