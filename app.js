// app.js
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Mock database for demonstration purposes
const users = [];

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

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // Check if username already exists
  if (users.some((user) => user.username === username)) {
    res.send("Username already exists! Please choose another one.");
  } else {
    // Create new user and store in mock database
    users.push({ username, password });
    res.send("User signed up successfully!");
  }
});

// Log in route
app.get("/login", (req, res) => {
  res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Log In</button>
        </form>
    `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
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
});

// Log out route
app.get("/logout", (req, res) => {
  // Destroy session data to log user out
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.send("Error logging out!");
    } else {
      res.send("Logged out successfully!");
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
