const router = require('express').Router();
const { UserRecipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const userRecipeData = await UserRecipe.create({
            user_id: req.session.userId,
            recipe_id: req.body.recipeId,
        });
  
        res.status(200).json(userRecipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;