const session = require("express-session");
const app = express();



const sessionSecret = process.env.SESSION_SECRET || "default_secret";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
