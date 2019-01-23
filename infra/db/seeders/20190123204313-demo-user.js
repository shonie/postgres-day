module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'authors',
      [
        {
          nickname: 'John Doe',
          email: 'test@test.com',
          hashedPassword: '$2b$10$vIROtAg377tIBoCqUHwqOOc8wvcGPA0p0iZPr6Yv8nAhJ.WKPJos6',
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          id: 'cbe88576-1791-4c17-bc25-6fa86eb51102',
        },
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('authors', null, {}),
};
