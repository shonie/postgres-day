module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.removeColumn('authors', 'id').then(() =>
      queryInterface.addColumn('authors', 'id', {
        // allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      })
    );
  },

  down(queryInterface, DataTypes) {
    return queryInterface.removeColumn('authors', 'id').catch(() =>
      queryInterface.addColumn('authors', 'id', {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      })
    );
  },
};
