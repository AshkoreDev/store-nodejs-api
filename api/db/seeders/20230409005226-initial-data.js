'use strict';

const { ROLE_TABLE } = require('../models/role.model.js');
const { RoleData } = require('./../data/role.data.js');


module.exports = {
  
  async up (queryInterface) {

    await queryInterface.bulkInsert(ROLE_TABLE, RoleData); 
  },

  async down (queryInterface) { }
};