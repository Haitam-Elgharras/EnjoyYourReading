const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getAllArticles() {
  return prisma.article.findMany();
}
function getArticleById(id) {
  return prisma.article.findUnique({
    where: {
      idarticle: parseInt(id),
    },
  });
}

function addArticle(article) {
  return prisma.article.create({
    data: article,
  });
}
function updateArticle(article) {
  return prisma.article.update({
    where: { idarticle: +article.idarticle },
    data: article,
  });
}

function deleteArticle(id) {
  return prisma.article.delete({
    where: { idarticle: +id },
  });
}
module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
};
