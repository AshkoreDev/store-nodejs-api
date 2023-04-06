const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Order;

class OrderService {

  constructor() { }

  async find() {

    const orders = await model.findAll();

    if(orders < 1) {

      throw boom.notFound('ORDERS NOT FOUND.');

    } else {

      return ordersordersByUser;
    }
  }

  async findOne(orderId) {

    const order = await model.findByPk(orderId, { include: [{ association: 'orderCustomer', include: ['customerUser'] }, 'orderItems'] });

    if(!order) {

      throw boom.notFound('ORDER NOT FOUND.');

    } else {

      return order;
    }
  }

  async findByUser(customerId) {

    const ordersByUser = await model.findAll({
      where: {
        '$orderCustomer.id$': customerId
      },
      include: [
        {
          association: 'orderCustomer',
          include: ['customerUser']
        }
      ]
    });

    if(ordersByUser < 1) {

      throw boom.notFound('ORDERS NOT FOUND.');

    } else {

      return ordersByUser;
    }
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