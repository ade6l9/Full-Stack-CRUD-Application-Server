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
        as: 'students', // Alias for the association
        onDelete: 'CASCADE', // Delete associated students when a campus is deleted
      });
    }
  }

  Campus.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Name is required
        validate: {
          notEmpty: true, // Name cannot be an empty string
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false, // Address is required
        validate: {
          notEmpty: true, // Address cannot be an empty string
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Description can be null
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true, // Image URL can be null
        defaultValue: 'https://via.placeholder.com/150', // Default image URL
        validate: {
          isUrl: true, // Validate that it is a valid URL
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
