// The model definition is done in /path/to/models/project.js
// As you might notice, the DataTypes are the very same as explained above
module.exports = (sequelize, DataTypes) =>
  sequelize.define('author', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    nickname: DataTypes.STRING,
    email: DataTypes.TEXT,
    hashedPassword: DataTypes.STRING,
  });
