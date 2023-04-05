const { Sequelize, Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model.js');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  
  orderId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  customerId: {
    allowNull: false,
    field: 'customer_id',
    type: DataTypes.INTEGER(10),
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },//, decimal
  total: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    allowNull: false,
    defaultValue: 'SP',
    type: DataTypes.ENUM('SP', 'P', 'E')
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


class Order extends Model {

  static associate(models) {

    this.belongsTo(models.Customer, { as: 'orderCustomer', foreignKey: 'customerId' });

    this.belongsToMany(models.Product, {
      as: 'orderItems',
      through: models.OrderDetail,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: true,
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'updated_at'] }
      }
    }
  } 
};


module.exports = { ORDER_TABLE, OrderSchema , Order };