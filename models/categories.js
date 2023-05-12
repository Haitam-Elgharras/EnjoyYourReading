const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getAllCategories() {
  return prisma.categorie.findMany();
}
function getCategorieById(id) {
  return prisma.findUnique({
    where: {
      idcategorie: +id,
    },
  });
}
function addCategorie(categorie) {
  return prisma.categorie.create({
    data: categorie,
  });
}
function updateCategorie(id, categorie) {
  return prisma.categorie.update({
    where: {
      idcategorie: +id,
    },
    data: categorie,
  });
}
function deleteCategorie(id) {
  return prisma.categorie.delete({
    where: {
      idcategorie: +id,
    },
  });
}

module.exports = {
  getAllCategories,
  getCategorieById,
  addCategorie,
  updateCategorie,
  deleteCategorie,
};
