const router = require("express").Router();
const { Recipe } = require("../models");
const { User } = require("../models");
const { UserRecipe } = require('../models');
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          through: UserRecipe,
          attributes: ['username'],
        },
      ],
      order: [["id", "DESC"]],
      limit: 5,
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    
    res.render("homepage", {
      recipes,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
    console.log(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [["name", "ASC"]],
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes)

    res.render("allRecipes", {
      recipes,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });
    console.log(recipe);
    console.log(recipe.users)
    console.log(recipe.users[0].user_recipe);

    res.render("recipe", {
      recipe,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.userId, {
          include: [
            {
              model: Recipe,
              through: UserRecipe,
            },
          ],
      });

      const user = userData.get({ plain: true });
      console.log(user);

      res.render('profile', {
        user, 
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      });
  } catch (err) {
      res.status(500).json(err);
  }
})

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
