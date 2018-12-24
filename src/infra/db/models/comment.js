module.exports = (sequelize, DataTypes) =>
  sequelize.define('comment', {
    text: DataTypes.TEXT,
    author: DataTypes.UUID,
    comments: DataTypes.ARRAY(DataTypes.UUID),
    likes: DataTypes.ARRAY(DataTypes.UUID),
  });
