const Joi = require('joi');

const productId = Joi.number().integer();

const code = Joi.string().min(1).max(20);

const name = Joi.string().min(1).max(100);

const description = Joi.string().min(1).max(200);

const price = Joi.number().min(1).max(9999999999);

const stock = Joi.number().min(1).max(999);

const categoryId = Joi.number().integer();

const active = Joi.number().integer().min(0).max(1);


const idOrderSchema = Joi.object({
  productId: productId.required()
});

const createOrderSchema = Joi.object({
  code: code.required(),
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required()
});

const updateOrderSchema = Joi.object({
  code: code,
  name: name,
  description: description,
  price: price,
  stock: stock,
  categoryId: categoryId,
  active: active
});

module.exports = { idOrderSchema, createOrderSchema, updateOrderSchema };