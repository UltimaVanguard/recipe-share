const User = require('./User');
const Recipe = require('./Recipe');
const UserRecipe = require('./UserRecipe');

// Users can have many recipes
User.belongsToMany(Recipe,
        {through: {
            model: UserRecipe,
            unique: true,
        },
        foreignKey: 'user_id',
        otherKey: 'recipe_id',
    }
);

// Recipes can be tied to many users
Recipe.belongsToMany(User,
    { through: {
            model: UserRecipe,
            unique: true,
        },
        foreignKey: 'recipe_id',
        otherKey: 'user_id',
    },
);

module.exports = { User, Recipe, UserRecipe };