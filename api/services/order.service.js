const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Order;

class OrderService {

  constructor() { }

  async find() {

    const orders = await model.findAll();

    return orders;
  }

  async findOne(orderId) {

    const order = await model.findByPk(orderId, { include: [{ association: 'Customer', include: ['User'] }, 'Items'] });

    if(!order) {

      throw boom.notFound('ORDER NOT FOUND.');

    } else {

      return order;
    }
  }

  async findByUser(orderId) {

    const ordersByUser = await model.findAll(orderId, { include: ['Customer'], include: ['Items'], where: { '$Customer.user.id$': userId } });

    return ordersByUser;
  }

  async create(data) {

    const newOrder = await model.create(data);
    
    return newOrder;
  }

  async update(orderId, changes) {

    const order = await this.findOne(orderId);
    const updatedOrder = await order.update(changes);
    
    return updatedOrder;
  }

  async delete(orderId) {

    const order = await this.findOne(orderId);
    await order.destroy();

    return { orderId };
  }
};


module.exports = OrderService;