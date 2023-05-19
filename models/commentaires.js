const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getAllCommentaires() {
  return prisma.commentaire.findMany();
}
function getCommentaireById(id) {
  return prisma.commentaire.findUnique({
    where: {
      idcommentaire: +id,
    },
  });
}
function addCommentaire(commentaire) {
  // if (req.user.iduser != req.body.iduser)
  //   return res.status(401).send("operation not allowed");
  return prisma.commentaire.create({
    data: commentaire,
  });
}
function updateCommentaire(id, commentaire) {
  // const comment = prisma.commentaire.findUnique({
  //   where: {
  //     idcommentaire: +id,
  //   },
  // });
  // if (req.user.iduser != comment.iduser)
  //   res.status(401).send("operation not allowed");
  return prisma.commentaire.update({
    where: { idcommentaire: +id },
    data: commentaire,
  });
}

function deleteCommentaire(id) {
  // const comment = prisma.commentaire.findUnique({
  //   where: {
  //     idcommentaire: +id,
  //   },
  // });
  // if (req.user.iduser != comment.iduser)
  //   res.status(401).send("operation not allowed");

  return prisma.commentaire.delete({
    where: { idcommentaire: +id },
  });
}

module.exports = {
  getAllCommentaires,
  getCommentaireById,
  addCommentaire,
  updateCommentaire,
  deleteCommentaire,
};
