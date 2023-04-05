const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.OrderDetail;

class OrderDetailService {

  constructor() { }

  async findOne(orderItemId) {

    const item = await model.findByPk(orderItemId);

    if(!item) {

      throw boom.notFound('ORDER ITEM NOT FOUND.');

    } else {

      return orderDetail;
    }
  }

  async addItem(data) {

    const newItem = await model.create(data);

    return newItem;
  }

  async update(orderItemId, changes) {

    const item = await this.findOne(orderItemId);
    const updatedItem = await item.update(changes);
    
    return updatedItem;
  }

  async delete(orderItemId) {

    const item = await this.findOne(orderItemId);
    await item.destroy();

    return { item };
  }
};


module.exports = OrderDetailService;