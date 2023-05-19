var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllCategories,
  getCategorieById,
  addCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../models/categories");

//get all categories
router.get("/", (req, res, next) => {
  getAllCategories().then((categories) => res.json(categories));
});

//get categorie by id
router.get("/:id([0-9]+)", (req, res, next) => {
  getCategorieById(req.params.id).then((categorie) => res.json(categorie));
});

//post categorie
router.post("/", auth, (req, res, next) => {
  addCategorie(req.body).then((categorie) => res.json(categorie));
});

//put categorie
router.put("/:id([0-9]+)", auth, (req, res, next) => {
  updateCategorie(req.params.id, req.body).then((categorie) =>
    res.json(categorie)
  );
});

//delete categorie
router.delete("/:id([0-9]+)", auth, (req, res, next) => {
  deleteCategorie(req.params.id).then((categorie) => res.json(categorie));
});

module.exports = router;
