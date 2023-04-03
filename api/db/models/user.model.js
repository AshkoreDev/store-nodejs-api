const { Sequelize, Model, DataTypes } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {

  userId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(150),
  },
  username: {
    allowNull: true,
    unique: true,
    type: DataTypes.STRING(20)
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },
  recoveryToken: {
    allowNull: true,
    field: 'recovery_token',
    type: DataTypes.STRING
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

class User extends Model {

  // static associate(models) {

  // }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      updatedAt: 'updated_at'
    }
  } 
};

module.exports = { USER_TABLE, UserSchema , User };