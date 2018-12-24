module.exports = (sequelize, DataTypes) =>
  sequelize.define('like', {
    author: DataTypes.UUID,
    entityId: DataTypes.UUID,
    entityType: DataTypes.STRING,
  });
