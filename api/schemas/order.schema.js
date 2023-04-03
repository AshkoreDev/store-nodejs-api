const Joi = require('joi');

const orderId = Joi.number().integer();

const userId = Joi.number().integer();

const total = Joi.number();

const status = Joi.number().integer().min(1).max(5);


const idOrderSchema = Joi.object({
  orderId: orderId.required()
});

const createOrderSchema = Joi.object({
  userId: userId.required(),
  total: total.required()
});

const updateOrderSchema = Joi.object({
  userId: userId,
  total: total,
  status: status
});

module.exports = { idOrderSchema, createOrderSchema, updateOrderSchema };