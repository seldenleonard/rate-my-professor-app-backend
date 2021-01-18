const Sequelize = require('sequelize');

// ASSOCIATIONS
module.exports = (sequelize, DataTypes) => {
  // MODEL
  var Review = sequelize.define('review', {
    professor_id: {
      type: Sequelize.INTEGER
    },
    rating: {
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.TEXT
    }
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Professor, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};