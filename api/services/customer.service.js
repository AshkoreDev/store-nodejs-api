const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Customer;

class CustomerService {

  constructor() { }

  async find() {

    const customers = await model.findAll({ include: [{ association: 'customerUser', include: ['userRole'] }] });
  
    return customers;
  }

  async findOne(customerId) {

    const customer = await model.findByPk(customerId, { include: ['customerUser'] });

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

  async update(customerId, changes) {

    const customer = await this.findOne(customerId);
    const updatedCustomer = await customer.update(changes);
    
    return updatedCustomer;
  }

  async delete(customerId) {

    const customer = await this.findOne(customerId);
    await customer.destroy();

    return { customerId };
  }
};


module.exports = CustomerService;