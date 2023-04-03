const Joi = require('joi');

const productId = Joi.number().integer();

const code = Joi.string().min(1).max(20);

const name = Joi.string().min(1).max(100);

// const image = Joi.string().uri();

const description = Joi.string().min(1).max(200);

const price = Joi.number();

const stock = Joi.number().min(0).max(999);

const categoryId = Joi.number().integer();

const active = Joi.number().integer().min(0).max(1);

const limit = Joi.number().integer();

const offset = Joi.number().integer();


const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset
});

const idProductSchema = Joi.object({
  productId: productId.required()
});

const createProductSchema = Joi.object({
  code: code.required(),
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  code: code,
  name: name,
  description: description,
  price: price,
  stock: stock,
  categoryId: categoryId,
  active: active
});

module.exports = { queryProductSchema, idProductSchema, createProductSchema, updateProductSchema };