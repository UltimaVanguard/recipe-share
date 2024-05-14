const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
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

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
