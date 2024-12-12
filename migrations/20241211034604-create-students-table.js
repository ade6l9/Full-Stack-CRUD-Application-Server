// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Students', {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       firstname: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       lastname: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false,
//       },
//       gpa: {
//         type: Sequelize.DECIMAL(3, 2),
//       },
//       imageUrl: {
//         type: Sequelize.TEXT,
//       },
//       campusId: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'Campuses', // Ensure this matches the name of the campuses table
//           key: 'id',
//         },
//         onDelete: 'SET NULL',
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Students');
//   },
// };

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize .STRING,
        unique: true,
        allowNull: false,
      },
      gpa: {
        type: Sequelize.DECIMAL(3, 2),
      },
      imageurl: {
        type: Sequelize.TEXT,
      },
      campusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Campuses', // Ensure this matches the name of the campuses table
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  },
};