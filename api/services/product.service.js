const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize.js');

const model = sequelize.models.Product;

class ProductService {

  constructor() { }

  async find(limit, offset) {

    const options = { include: ['Category'] };

    // if(limit && offset) {

    //   options.limit = limit;
    //   options.offset = offset;
    // }

    const products = await model.findAll(options);

    return products;
  }

  async findOne(productId) {

    const product = await model.findByPk(productId, { include: ['Category'] });

    if(!product) {

      throw boom.notFound('PRODUCT NOT FOUND.');

    } else {

      return product;
    }
  }

  async create(data) {

    const newProduct = await model.create(data);
    
    return newProduct;
  }

  async update(productId, changes) {

    const product = await this.findOne(productId);
    const updatedProduct = await product.update(changes);
    
    return updatedProduct;
  }

  async delete(productId) {

    const product = await this.findOne(productId);
    await product.destroy();

    return { productId };
  }
};

module.exports = ProductService;