'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model.js');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model.js');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model.js');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model.js');
const { OrderSchema, ORDER_TABLE } = require('./../models/order.model.js');
const { OrderDetailSchema, ORDER_DETAIL_TABLE} = require('./../models/order-detail.model.js');

module.exports = {
  
  up: async (queryInterface) => {
    
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_DETAIL_TABLE, OrderDetailSchema);
  },

  down: async (queryInterface) => {
    
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);  
    await queryInterface.dropTable(CATEGORY_TABLE);  
    await queryInterface.dropTable(PRODUCT_TABLE); 
    await queryInterface.dropTable(ORDER_TABLE);  
    await queryInterface.dropTable(ORDER_DETAIL_TABLE);  
  }
};