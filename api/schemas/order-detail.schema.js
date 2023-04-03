const Joi = require('joi');

const orderDetailId = Joi.number().integer();

const orderId = Joi.number().integer();

const productId = Joi.number().integer();

const amount = Joi.number().min(0).max(999);


const idOrderDetailSchema = Joi.object({
  orderDetailId: orderDetailId.required()
});

const createOrderDetailSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const updateOrderDetailSchema = Joi.object({
  orderId: orderId,
  productId: productId,
  amount: amount
});

module.exports = { idOrderDetailSchema, createOrderDetailSchema, updateOrderDetailSchema };