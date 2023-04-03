const { Sequelize, Model, DataTypes } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  
  orderId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  costumerId: {
    allowNull: false,
    field: 'costumer_id',
    type: DataTypes.INTEGER(10),
    references: {
      model: COSTUMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  total: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    defaultValue: 1,
    type: DataTypes.TINYINT(1)
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

    this.belongsTo(models.Customer, { as: 'Customer' });

    this.belongsToMany(models.Product, {
      as: 'Items',
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
      updatedAt: 'updated_at'
    }
  } 
};

module.exports = { ORDER_TABLE, OrderSchema , Order };