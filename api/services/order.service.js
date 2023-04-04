const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Order;

class OrderService {

  constructor() { }

  async find() {

    const orders = await model.findAll();

    return orders;
  }

  async findOne(id) {

    const order = await model.findByPk(id, { include: ['Customer'], include: ['Items'] });

    if(!order) {

      throw boom.notFound('ORDER NOT FOUND.');

    } else {

      return order;
    }
  }

  async findByUser(id) {

    const ordersByUser = await model.findAll(id, { include: ['Customer'], include: ['Items'], where: { '$Customer.user.id$': id } });

    return ordersByUser;
  }

  async create(data) {

    const newOrder = await model.create(data);
    
    return newOrder;
  }

  async update(id, changes) {

    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    
    return updatedOrder;
  }

  async delete(id) {

    const order = await this.findOne(id);
    await order.destroy();

    return { id };
  }
};

module.exports = OrderService;