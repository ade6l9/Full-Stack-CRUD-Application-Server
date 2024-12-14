'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // A student belongs to one campus
      Student.belongsTo(models.Campus, {
        foreignKey: 'campusId',
        as: 'campus', // Alias for the association
        onDelete: 'SET NULL', // If the campus is deleted, set campusId to null
      });
    }
  }

  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      imageurl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://via.placeholder.com/150',
        validate: {
          isUrl: true,
        },
      },
      gpa: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0.0,
          max: 4.0,
        },
      },
      campusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Campuses', 
          key: 'id', 
        },
      },
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );

  return Student;
};