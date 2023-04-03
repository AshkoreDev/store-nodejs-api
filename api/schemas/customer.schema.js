const Joi = require('joi');

const customerId = Joi.number().integer();

const name = Joi.string().min(1).max(100);

const nationality = Joi.string().min(1).max(3);

const documentType = Joi.string().min(1).max(20);

const documentNumber = Joi.string().min(1).max(20);

const gender = Joi.string().min(1).max(1);

const dateOfBirth = Joi.date();

const telephone = Joi.string().min(1).max(20);

const email = Joi.string().email().min(10).max(100);

const address = Joi.string().min(5).max(100);

const username = Joi.string().min(3).max(20);

const password = Joi.string().min(8).max(20);

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
  address: address
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
  active: active
});

module.exports = { idCustomerSchema, createCustomerSchema, updateCustomerSchema };