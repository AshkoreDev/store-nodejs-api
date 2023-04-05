const { Sequelize, Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model.js');

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
    defaultValue: 'D',
    type: DataTypes.ENUM('D', 'P')
  },
  documentNumber: {
    allowNull: false,
    field: 'document_number',
    type: DataTypes.STRING(20)
  },
  gender: {
    allowNull: false,
    type: DataTypes.ENUM('F', 'M', 'O')
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
  userId: {
    allowNull: false,
    field: 'user_id',
    unique: true,
    type: DataTypes.INTEGER(10),
    references: {
      model: USER_TABLE,
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


class Customer extends Model {

  static associate(models) {

    this.belongsTo(models.User, { as: 'customerUser', foreignKey: 'userId' });
    this.hasMany(models.Order, { as: 'customerOrder', foreignKey: 'customerId' });
  }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: true,
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'updated_at'] }
      }
    }
  } 
};


module.exports = { CUSTOMER_TABLE, CustomerSchema , Customer };