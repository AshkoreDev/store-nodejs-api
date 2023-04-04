const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Customer;

class CustomerService {

  constructor() { }

  async find() {

    const customers = await model.findAll({ include: ['user'] });

    return customers;
  }

  async findOne(id) {

    const customer = await model.findByPk(id, { include: ['user'] });

    if(!customer) {

      throw boom.notFound('CUSTOMER NOT FOUND.');

    } else {

      return customer;
    }
  }

  async create(data) {

    const newCustomer = await model.create(data);
    
    return newCustomer;
  }

  async update(id, changes) {

    const customer = await this.findOne(id);
    const updatedCustomer = await customer.update(changes);
    
    return updatedCustomer;
  }

  async delete(id) {

    const customer = await this.findOne(id);
    await customer.destroy();

    return { id };
  }
};

module.exports = CustomerService;