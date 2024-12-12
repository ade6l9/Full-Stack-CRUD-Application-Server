// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Student extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // A student belongs to one campus
//       Student.belongsTo(models.Campus, {
//         foreignKey: 'campusId',
//         as: 'campus', // Alias for the association
//         onDelete: 'SET NULL', // If the campus is deleted, set campusId to null
//       });
//     }
//   }

//   Student.init(
//     {
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false, // First name is required
//         validate: {
//           notEmpty: true, // First name cannot be an empty string
//         },
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false, // Last name is required
//         validate: {
//           notEmpty: true, // Last name cannot be an empty string
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false, // Email is required
//         unique: true, // Ensure email is unique
//         validate: {
//           isEmail: true, // Validate email format
//         },
//       },
//       imageUrl: {
//         type: DataTypes.STRING,
//         allowNull: true, // Image URL can be null
//         defaultValue: 'https://via.placeholder.com/150', // Default image URL
//         validate: {
//           isUrl: true, // Validate that it is a valid URL
//         },
//       },
//       gpa: {
//         type: DataTypes.FLOAT,
//         allowNull: true, // GPA can be null
//         validate: {
//           min: 0.0, // Minimum GPA is 0.0
//           max: 4.0, // Maximum GPA is 4.0
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Student',
//     }
//   );

//   return Student;
// };


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
          model: 'Campuses', // Name of the target model
          key: 'id', // Key in the target model
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