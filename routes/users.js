var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
} = require("../models/users");

//get all users must have two parameters take and skip to make pagination and the url will be like this : http://localhost:3000/users?take=2&skip=2
//if we don't use the take and skip parameters the default value will be 10
router.get("/", (req, res, next) => {
  const take = req.query.take ? parseInt(req.query.take) : 10;
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
    //we add the token to the header of the response to make the user login after the registration directly
    const token = jwt.sign(
      //this is the payload
      {
        iduser: user.iduser,
      },
      //this is the private key
      config.get("jwtPrivateKey")
      //the payload and the private key are used to generate the token which is used to authenticate the user
    );
    res.header("x-auth-token", token).json(user);
  });
  // addUser(req.body).then((user) => res.json(user));
});

//PUT : it's used to update data

router.put("/:id", (req, res, next) => {
  updateUser(req.params.id, req.body).then((user) => res.json(user));
});

//DELETE

router.delete("/:id([0-9]+)", (req, res, next) => {
  deleteUser(req.params.id).then((user) => res.json(user));
});

module.exports = router;
