/*jwt is a json web token that we use to authenticate the user 
and it works like a session but it's more secure and it's stateless
*/
const jwt = require("jsonwebtoken");
var Joi = require("joi");
const config = require("config");
var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();

//the authententication need just the email and the password
router.post("/", async (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  var user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (user == {} || user == null)
    return res.status(400).send("invalid email or password");
  if (user.password == req.body.password) {
    // it's a best practice to store the private key in an environment variable
    //and also prefix it with the name of the app like blog_jwtPrivateKey
    const token = jwt.sign(
      {
        iduser: user.iduser,
        email: user.email,
      },
      process.env.jwtPrivateKey
    );
    //I have a problem with the scure key it's always take the value from the default.json file
    //if a user login with a valid email and password we send a token to the user and the x-auth-token in the header of the response
    return res.header("x-auth-token", token).send(token);
  } else res.status(400).send("invalid email or password");
});
/*
I need to work on the authentication so I create a file names auth.js in the routes folder then
but I still have a problem with the authentication it always says n 
 */
module.exports = router;
