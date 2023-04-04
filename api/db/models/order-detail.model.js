const { Sequelize, Model, DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('./order.model.js');
const { PRODUCT_TABLE } = require('./product.model.js');

const ORDER_DETAIL_TABLE = 'orders_details';

const OrderDetailSchema = {

  orderDetailId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  orderId: {
    allowNull: false,
    unique: true,
    field: 'order_id',
    type: DataTypes.INTEGER(10),
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  productId: {
    allowNull: false,
    field: 'product_id',
    type: DataTypes.INTEGER(10),
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  amount: {
    allowNull: false,
    defaultValue: 1,
    type: DataTypes.INTEGER(3)
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
};

class OrderDetail extends Model {

  static config(sequelize) {

    return {
      sequelize, 
      tableName: ORDER_DETAIL_TABLE,
      modelName: 'OrderDetail',
      timestamps: true,
      // updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  } 
};

module.exports = { ORDER_DETAIL_TABLE, OrderDetailSchema , OrderDetail };