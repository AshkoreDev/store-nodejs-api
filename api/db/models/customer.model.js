const { Sequelize, Model, DataTypes } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {

  customerId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100)
  },
  nationality: {
    allowNull: false,
    type: DataTypes.STRING(3)
  },
  documentType: {
    allowNull: false,
    field: 'document_type',
    type: DataTypes.STRING(20)
  },
  documentNumber: {
    allowNull: false,
    field: 'document_number',
    type: DataTypes.STRING(20)
  },
  gender: {
    allowNull: false,
    type: DataTypes.ENUM('H', 'M', 'O')
  },
  dateOfBirth: {
    allowNull: false,
    field: 'date_of_birth',
    type: DataTypes.DATEONLY
  },
  telephone: {
    allowNull: true,
    type: DataTypes.STRING(20)
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING(100),
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

class Customer extends Model {

  static associate(models) {

    this.hasMany(models.Order, { as: 'Orders', foreignKey: 'customerId' });
  }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: true,
      updatedAt: 'updated_at'
    }
  } 
};

module.exports = { CUSTOMER_TABLE, CustomerSchema , Customer };