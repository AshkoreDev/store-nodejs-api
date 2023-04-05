const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.User;

class UserService {

  constructor() { }

  async find() {

    const users = await model.findAll({ include: ['userRole', 'userCustomer'] });

    return users;
  }

  async findOne(userId) {

    const user = await model.findByPk(userId, { include: ['userRole', 'userCustomer'] });

    if(!user) {

      throw boom.notFound('USER NOT FOUND.');

    } else {

      return user;
    }
  }

  async findByEmail(email) {

    const user = await model.findOne({ where: { email } });

    return user;
  }

  async create(data) {

    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await model.create({ ...data, password: hash });
    
    return newUser;
  }

  async update(userId, changes) {

    const user = await this.findOne(userId);
    const updatedUser = await user.update(changes);
    
    return updatedUser;
  }

  async delete(userId) {

    const user = await this.findOne(userId);
    await user.destroy();

    return { userId };
  }
};


module.exports = UserService;