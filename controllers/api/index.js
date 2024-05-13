const router = require('express').Router();

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRecipeRoutes = require('./userRecipeRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/userRecipes', userRecipeRoutes);

module.exports = router;