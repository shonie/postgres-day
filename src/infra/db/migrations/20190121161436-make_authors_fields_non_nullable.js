module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface
      .changeColumn('authors', 'comments', {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      })
      .then(() =>
        queryInterface.changeColumn('authors', 'topics', {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
        })
      )
      .then(() =>
        queryInterface.changeColumn('authors', 'likes', {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
        })
      );
  },

  down(queryInterface, DataTypes) {
    return queryInterface
      .changeColumn('authors', 'comments', {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
      })
      .then(() =>
        queryInterface.changeColumn('authors', 'topics', {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: true,
        })
      )
      .then(() =>
        queryInterface.changeColumn('authors', 'likes', {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: true,
        })
      );
  },
};
