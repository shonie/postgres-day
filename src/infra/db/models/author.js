// The model definition is done in /path/to/models/project.js
// As you might notice, the DataTypes are the very same as explained above
module.exports = (sequelize, DataTypes) =>
  sequelize.define('author', {
    nickname: DataTypes.STRING,
    email: DataTypes.TEXT,
    topics: DataTypes.ARRAY(DataTypes.UUID),
    comments: DataTypes.ARRAY(DataTypes.UUID),
    likes: DataTypes.ARRAY(DataTypes.UUID),
    hashedPassword: DataTypes.STRING,
  });
