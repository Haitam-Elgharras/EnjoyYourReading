const express = require("express");
const {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("../models/articles");
const router = express.Router();

//get all articles

router.get("/", (req, res, next) => {
  getAllArticles().then((articles) => res.json(articles));
});

//get article by id
router.get("/:id([0-9]+)", (req, res, next) => {
  getArticleById(req.params.id).then((article) => res.json(article));
});

//post article
router.post("/", (req, res, next) => {
  addArticle(req.body).then((article) => res.json(article));
});

//put article
router.put("/:id([0-9]+)", (req, res, next) => {
  updateArticle(req.params.id, req.body).then((article) => res.json(article));
});
router.put("/", (req, res, next) => {
  updateArticle(req.body).then((article) => res.json(article));
});

//delete article
router.delete("/:id([0-9]+)", (req, res, next) => {
  deleteArticle(req.params.id).then((article) => res.json(article));
});

// export the router
module.exports = router;
