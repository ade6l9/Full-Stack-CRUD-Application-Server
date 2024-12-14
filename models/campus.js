'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Campus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A campus can have many students
      Campus.hasMany(models.Student, {
        foreignKey: 'campusId',
        as: 'students', 
        onDelete: 'CASCADE', 
      });
    }
  }

  Campus.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true, 
        defaultValue: 'https://via.placeholder.com/150', 
        validate: {
          isUrl: true, 
        },
      },
    },
    {
      sequelize,
      modelName: 'Campus',
    }
  );

  return Campus;
};
