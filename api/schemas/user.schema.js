const Joi = require('joi');

const userId = Joi.number().integer();

const email = Joi.string().email();

const username = Joi.string().min(1).max(20);

const password = Joi.string().min(8).max(20);

const role = Joi.number().integer();


const idUserSchema = Joi.object({
  userId: userId.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  username: username.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  username: username,
  password: password,
  role: role
});

module.exports = { idUserSchema, createUserSchema, updateUserSchema }