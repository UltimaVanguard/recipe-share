const sequelize = require('../config/connection');
const { User, Recipe, UserRecipe } = require('../models');

const userSeedData = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // creates an array of users while populating User table
    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
    })

    // creates an array of recipes while populating recipe table
    const recipes = await Recipe.bulkCreate(recipeSeedData);

    // ties random users and recipes together
    for (let i = 0; i < 10; i++) {
        const { id: randomUserId } = users[
            Math.floor(Math.random() * users.length)
        ];

        const { id: randomRecipeId} = recipes[
            Math.floor(Math.random() * recipes.length)
        ];

        await UserRecipe.create({
            user_id: randomUserId,
            recipe_id: randomRecipeId,
        }).catch((err) => {
            console.log(err);
        });
    }

    process.exit(0);
};

seedDatabase();