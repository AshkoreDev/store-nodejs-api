const boom = require('@hapi/boom');
// const bcrypt = require('bcrypt');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.User;

class UserService {

  constructor() { }

  async find() {

    const users = await model.findAll({ include: ['customer'] });

    return users;
  }

  async findOne(id) {

    const user = await model.findByPk(id, { include: ['Customer'] });

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

    // const hash = await bcrypt.hash(data.password, 10);
    // const newUser = await model.create({ ...data, password: hash });
    const newUser = await model.create(data);
    return newUser;
  }

  async update(id, changes) {

    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    
    return updatedUser;
  }

  async delete(id) {

    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
};

module.exports = UserService;