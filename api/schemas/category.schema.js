const Joi = require('joi');

const categoryId = Joi.number().integer();

const name = Joi.string().min(1).max(50);

const description = Joi.string().min(1).max(200);

const active = Joi.number().integer().min(0).max(1);


const idCategorySchema = Joi.object({
  categoryId: categoryId.required()
});

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  description: description,
  active: active
});

module.exports = { idCategorySchema, createCategorySchema, updateCategorySchema };