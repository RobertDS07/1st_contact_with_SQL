'use strict';

const Post = require("../../models/Post");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('likes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Post', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      likesId: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('likes');
  }
};
