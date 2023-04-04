const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Category;

class CategoryService {

  constructor() { }

  async find() {

    const categories = await model.findAll();
    
    return categories;
  }

  async findOne(categoryId) {

    const category = await model.findByPk(categoryId, { include: ['Products'] });

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

  async update(categoryId, changes) {

    const category = await this.findOne(categoryId);
    const updatedCategory = await category.update(changes);
    
    return updatedCategory;
  }

  async delete(categoryId) {

    const category = await this.findOne(categoryId);
    await category.destroy();

    return { categoryId };
  }
};

module.exports = CategoryService;