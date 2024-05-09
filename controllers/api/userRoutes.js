const express = require("express").Router;
const cookieParser = require("cookie-parser");
// Middleware
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());const { User } = [];

// Routes

// Sign up route
app.get("/signup", (req, res) => {
  res.send(`
        <form action="/signup" method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Sign Up</button>
        </form>
    `);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username already exists
    if (users.some((user) => user.username === username)) {
      res.send("Username already exists! Please choose another one.");
    } else {
      // Create new user and store in mock database
      users.push({ username, password });
      res.send("User signed up successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username and password match
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      // Set session data to indicate user is logged in
      req.session.isLoggedIn = true;
      res.send("Logged in successfully!");
    } else {
      res.send("Invalid username or password!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/logout", async (req, res) => {
  try {
    // Destroy session data to log user out
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.send("Error logging out!");
      } else {
        res.send("Logged out successfully!");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
