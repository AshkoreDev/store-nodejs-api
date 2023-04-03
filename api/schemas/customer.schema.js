const Joi = require('joi');

const customerId = Joi.number().integer();

const name = Joi.string().min(1).max(100);

const nationality = Joi.string().min(1).max(3);

const documentType = Joi.string().min(1).max(20);

const documentNumber = Joi.string().min(1).max(20);

const gender = Joi.string().min(1).max(1);

const dateOfBirth = Joi.date();

const telephone = Joi.string().min(1).max(20);

const address = Joi.string().min(1).max(100);

const userId = Joi.number().integer();

const active = Joi.number().integer().min(0).max(1);


const idCustomerSchema = Joi.object({
  customerId: customerId.required()
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  nationality: nationality.required(),
  documentType: documentType.required(),
  documentNumber: documentNumber.required(),
  gender: gender.required(),
  dateOfBirth: dateOfBirth.required(),
  telephone: telephone,
  address: address,
  userId: userId.required()
});

const updateCustomerSchema = Joi.object({
  name: name,
  nationality: nationality,
  documentType: documentType,
  documentNumber: documentNumber,
  gender: gender,
  dateOfBirth: dateOfBirth,
  telephone: telephone,
  address: address,
  userId: userId,
  active: active
});

module.exports = { idCustomerSchema, createCustomerSchema, updateCustomerSchema };