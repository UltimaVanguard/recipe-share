const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserRecipe extends Model {}

UserRecipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    //   Foreign Key of id from User
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          unique: false,
        },
      },
    //   Foreign Key of id from Recipe
      recipe_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'recipe',
          key: 'id',
          unique: false,
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_recipe'
  }
);

module.exports = UserRecipe;