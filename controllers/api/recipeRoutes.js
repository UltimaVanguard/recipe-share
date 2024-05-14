const router = require('express').Router();
const { Recipe } = require('../../models');
const { UserRecipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const recipeData = await Recipe.create({
            name: req.body.name,
            description: req.body.description,
            instructions: req.body.instructions,
            ingredients: [req.body.ingredients],
            image: req.body.image,
            owner_id: req.session.userId,
        });

        const userRecipeData = await UserRecipe.create({
            user_id: req.session.userId,
            recipe_id: recipeData.id
        })

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;