const dotenv = require("dotenv");
const config = require("config");

// Load environment variables from .env file
dotenv.config();
// Set the NODE_ENV variable if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//after we need to set the jwtPrivateKey in the terminal by typing: set blog_jwtPrivateKey=yourPrivateKey
//or we can set it in the config\custom-environment-variables.json file by typing: "blog_jwtPrivateKey":"yourPrivateKey"
if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articlesRouter = require("./routes/articles");
var categoriesRouter = require("./routes/categories");
var commentairesRouter = require("./routes/commentaires");
var authRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
// we use json midleware to parse the data from the body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static midleware give us the ability to use static files like css, js, images
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/categories", categoriesRouter);
app.use("/commentaires", commentairesRouter);

app.use("/auth", authRouter);

module.exports = app;
