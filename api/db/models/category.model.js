const { Sequelize, Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {

  categoryId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(200)
  },
  active: {
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

class Category extends Model {

  static associate(models) {
    
    this.hasMany(models.Product, { as: 'Products', foreignKey: 'categoryId' });
  }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: true,
      updatedAt: 'updated_at'
    }
  } 
};

module.exports = { CATEGORY_TABLE, CategorySchema , Category };