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
  return prisma.commentaire.create({
    data: commentaire,
  });
}
function updateCommentaire(id, commentaire) {
  return prisma.commentaire.update({
    where: { idcommentaire: +id },
    data: commentaire,
  });
}

function deleteCommentaire(id) {
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
