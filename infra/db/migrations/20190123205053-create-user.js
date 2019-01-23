module.exports = {
  up: async queryInterface => {
    await queryInterface.removeColumn('authors', 'topics');
    await queryInterface.removeColumn('authors', 'likes');
    await queryInterface.removeColumn('authors', 'comments');
  },
  down: queryInterface => queryInterface.dropTable('authors'),
};
