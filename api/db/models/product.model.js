const { Sequelize, Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model.js');

const PRODUCT_TABLE = 'products';

const ProductSchema = {

  productId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  code: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(20)
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(200)
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  stock: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER(3)
  },
  categoryId: {
    allowNull: false,
    field: 'category_id',
    type: DataTypes.INTEGER(10),
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  active: {
    allowNull: false,
    defaultValue: 'A',
    type: DataTypes.ENUM('A', 'I')
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

class Product extends Model {

  static associate(models) {
    
    this.belongsTo(models.Category, { as: 'productCategory', foreignKey: 'categoryId' });
  }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: true,
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'updated_at'] }
      }
    }
  } 
};


module.exports = { PRODUCT_TABLE, ProductSchema, Product };