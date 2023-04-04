const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Category;

class CategoryService {

  constructor() { }

  async find() {

    const categories = await model.findAll();
    
    return categories;
  }

  async findOne(id) {

    const category = await model.findByPk(id, { include: ['Products'] });

    if(!category) {

      throw boom.notFound('CATEGORY NOT FOUND.');

    } else {

      return category;
    }
  }

  async create(data) {

    const newCategory = await model.create(data);

    return newCategory;
  }

  async update(id, changes) {

    const category = await this.findOne(id);
    const updatedCategory = await category.update(changes);
    
    return updatedCategory;
  }

  async delete(id) {

    const category = await this.findOne(id);
    await category.destroy();

    return { id };
  }
};

module.exports = CategoryService;