const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllCommentaires,
  getCommentaireById,
  addCommentaire,
  updateCommentaire,
  deleteCommentaire,
} = require("../models/commentaires");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  // if (req.user.iduser != req.body.iduser)
  //   return res.status(401).send("operation not allowed");

  addCommentaire(req.body).then((commentaire) => res.json(commentaire));
});

//put commentaire
router.put("/:id([0-9]+)", auth, (req, res, next) => {
  if (req.user.iduser != req.body.iduser)
    return res.status(401).send("operation not allowed");

  updateCommentaire(req.params.id, req.body).then((commentaire) =>
    res.json(commentaire)
  );
});

//delete commentaire
router.delete("/:id([0-9]+)", auth, async (req, res, next) => {
  const comment = await prisma.commentaire.findUnique({
    where: {
      idcommentaire: +req.params.id,
    },
  });
  if (!comment) return res.status(404).send("comment not found");
  if (req.user.iduser != comment.iduser)
    return res.status(401).send("operation not allowed");

  deleteCommentaire(req.params.id).then((commentaire) => res.json(commentaire));
});

module.exports = router;
