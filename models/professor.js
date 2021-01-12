const Sequelize = require('sequelize');

// ASSOCIATIONS
module.exports = (sequelize, DataTypes) => {
  // MODEL
  var Professor = sequelize.define('professor', {
    name: {
      type: Sequelize.STRING
    },
    school: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    }
  });
  Professor.associate = (models) => {
    Professor.hasMany(models.Review, {
      foreignKey: 'professor_id',
      as: 'reviews',
    });
  };
  return Professor;
};