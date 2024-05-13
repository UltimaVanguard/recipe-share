const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const recipeData = await Recipe.create({
            name: req.body.name,
            description: req.body.description,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            owner_id: req.session.userId,
            image: req.body.image
        });
  
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;