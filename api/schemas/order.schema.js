const Joi = require('joi');

const orderId = Joi.number().integer();

const customerId = Joi.number().integer();

const total = Joi.number();

const status = Joi.string().min(1).max(1);


const idOrderSchema = Joi.object({
  orderId: orderId.required()
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  total: total.required()
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  total: total,
  status: status
});


module.exports = { idOrderSchema, createOrderSchema, updateOrderSchema };