const { Sequelize, Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {

  roleId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER(10)
  },
  title: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(20)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(50)
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


class Role extends Model {

  static associate(models) {
    
    this.hasMany(models.User, { as: 'roleUser', foreignKey: 'roleId' });
  }

  static config(sequelize) {

    return {
      sequelize, 
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: true,
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'updated_at'] }
      }
    }
  } 
};


module.exports = { ROLE_TABLE, RoleSchema , Role };