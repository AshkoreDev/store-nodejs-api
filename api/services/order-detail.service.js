const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.OrderDetail;

class OrderDetailService {

  constructor() { }

  async find() {

    const ordersDetails = await model.findAll();

    return ordersDetails;
  }

  async findOne(id) {

    const orderDetail = await model.findByPk(id);

    if(!orderDetail) {

      throw boom.notFound('ORDER DETAIL NOT FOUND.');

    } else {

      return orderDetail;
    }
  }

  async addItem(data) {

    const newItem = await model.create(data);

    return newItem;
  }

  async update(id, changes) {

    const orderDetail = await this.findOne(id);
    const updatedOrderDetail = await orderDetail.update(changes);
    
    return updatedOrderDetail;
  }

  async delete(id) {

    const orderDetail = await this.findOne(id);
    await orderDetail.destroy();

    return { id };
  }
};

module.exports = OrderDetailService;