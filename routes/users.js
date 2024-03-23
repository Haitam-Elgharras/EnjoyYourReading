var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const dotenv = require("dotenv");
dotenv.config();
const auth = require("../middleware/auth");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
} = require("../models/users");

//get all users must have two parameters take and skip to make pagination and the url will be like this : /users?take=2&skip=2
//if we don't use the take and skip parameters the default value will be 10
router.get("/", (req, res, next) => {
  const take = req.query.take ? parseInt(req.query.take) : 0;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  getAllUsers(take, skip).then((users) => res.json(users));
});

//we use the id(\d+) to make sure that the id is a number anathor way using rgex
//we use this approach to make sure that this route is executed only if the id is a number
//if we don't use it the email route will never be executed cause it will be considered as an id , cause the route id is the first one
router.get("/:id([0-9]+)", (req, res, next) => {
  getUserById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// we can write email/:email to make sure that there is no conflict with the id
router.get("/:email", (req, res, next) => {
  getUserByEmail(req.params.email).then((user) => res.json(user));
});

//POST
router.post("/", (req, res, next) => {
  //we need to add the token to the header of the response like this :
  addUser(req.body).then((user) => {
    if (!user) return res.status("400").send("the user already exist");
    //we add the token to the header of the response to make the user login after the registration directly
    const token = jwt.sign(
      //this is the payload
      {
        iduser: user.iduser,
        email: user.email,
        name: user.name,
      },
      //this is the private key
      process.env.jwtPrivateKey
      //the payload and the private key are used to generate the token which is used to authenticate the user
    );
    return res.header("x-auth-token", token).send(user);
  });
  // addUser(req.body).then((user) => res.json(user));
});

//PUT : it's used to update data

router.put("/:id", (req, res, next) => {
  updateUser(req.params.id, req.body).then((user) => res.json(user));
});

//DELETE

router.delete("/:id([0-9]+)", auth, (req, res, next) => {
  if (req.user.iduser != req.params.id)
    return res
      .status(401)
      .send("invalid operation : YOU ARE NOT THE OWNER OF THIS ACOUNT");

  //we need to send an message if the user still have some articles or commentaires

  deleteUser(req.params.id).then((user) => {
    if (user == 0) return res.status(404).send("user not found");
    return res.json(user);
  });
});

module.exports = router;
