module.exports = (sequelize, DataTypes) =>
  sequelize.define('topic', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    author: DataTypes.UUID,
    likes: DataTypes.UUID,
  });
