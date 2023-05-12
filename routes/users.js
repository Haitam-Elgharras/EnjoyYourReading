var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
} = require("../models/users");

// GET users listing.
router.get("/", function (req, res, next) {
  //we use json to send the data as json
  getAllUsers().then((users) => res.json(users));
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
  addUser(req.body).then((user) => res.json(user));
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
