'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('leeds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {
            model: "users",
            key: "id"
        }
      },
      leed_status:{
          type:Sequelize.ENUM,
          values:['pending','active','completed']
      },
      type:{
        type:Sequelize.ENUM,
        values:['old','new']
    },
      leed_address:{
          type:Sequelize.STRING
      },
      createdAt: { type: Sequelize.DATE, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
    });
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('leeds');

  }
};
