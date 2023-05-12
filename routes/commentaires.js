const express = require("express");
const router = express.Router();
const {
  getAllCommentaires,
  getCommentaireById,
  addCommentaire,
  updateCommentaire,
  deleteCommentaire,
} = require("../models/commentaires");

//get all commentaires
router.get("/", (req, res, next) => {
  getAllCommentaires().then((commentaires) => res.json(commentaires));
});

//get commentaire by id
router.get("/:id([0-9]+)", (req, res, next) => {
  getCommentaireById(req.params.id).then((commentaire) =>
    res.json(commentaire)
  );
});

//post commentaire
router.post("/", (req, res, next) => {
  addCommentaire(req.body).then((commentaire) => res.json(commentaire));
});

//put commentaire
router.put("/:id([0-9]+)", (req, res, next) => {
  updateCommentaire(req.params.id, req.body).then((commentaire) =>
    res.json(commentaire)
  );
});

//delete commentaire
router.delete("/:id([0-9]+)", (req, res, next) => {
  deleteCommentaire(req.params.id).then((commentaire) => res.json(commentaire));
});

module.exports = router;
