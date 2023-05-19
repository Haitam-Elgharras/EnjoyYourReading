const express = require("express");
const {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("../models/articles");
const auth = require("../middleware/auth");
const router = express.Router();

//just for security we will use the prisma client to get the article by id
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", (req, res, next) => {
  getAllArticles(req).then((articles) => res.json(articles));
});

//get article by id
router.get("/:id([0-9]+)", (req, res, next) => {
  getArticleById(req.params.id).then((article) => res.json(article));
  // a middleware is a function that takes a request and a response and the next function
  //our function is a middleware cause it takes the request and the response and the next function
  //but we dont use the next cause we don't have a next middleware in this route
});

//post article
/*we add auth as a second parameter to make sure that the user is authentificated (protect the routes)
  we need to make the post method allowed for the authentificated users
  so we will use a midleware to check if the user is authentificated or not
  if the auth function return a response the req will contain the user object
  */
router.post("/", auth, (req, res, next) => {
  //a user doesn't have the abilty to post an article with the id of another user
  if (req.user.iduser != req.body.iduser) {
    return res.status(401).send("invalid operation");
  }

  addArticle(req.body).then((article) => res.json(article));
});

//put article
router.put("/:id([0-9]+)", auth, (req, res, next) => {
  const Article = prisma.article.findUnique({
    where: { idarticle: +req.params.id },
  });
  console.log(Article.iduser, req.user.iduser);

  //a user doesn't have the abilty to post an article with the id of another user
  if (Article.iduser != req.user.iduser)
    return res.status(401).send("invalid operation");

  updateArticle(req.params.id).then((article) => res.json(article));
});

router.put("/", auth, async (req, res, next) => {
  //i need auth function to stop until the article return the value, the other code outside the auth function still executed
  const Article = await prisma.article.findUnique({
    where: { idarticle: +req.body.idarticle },
  });
  //a user doesn't have the abilty to post an article with the id of another user
  if (Article.iduser != req.user.iduser || req.body.iduser != req.user.iduser)
    return res.status(401).send("invalid operation");
  else updateArticle(req.body).then((article) => res.json(article));
});

//delete article
router.delete("/:id([0-9]+)", auth, async (req, res, next) => {
  const Article = await prisma.article.findUnique({
    where: { idarticle: +req.params.id },
  });
  //a user doesn't have the abilty to delete an article with the id of another user
  if (Article.iduser != req.user.iduser) {
    /*even when using res.status or res.send, you still need to include the return statement to ensure that the function exits early and no further code is executed. */
    return res.status(401).send("invalid operation");
  }

  deleteArticle(req.params.id).then((article) => res.json(article));
});

// export the router
module.exports = router;
