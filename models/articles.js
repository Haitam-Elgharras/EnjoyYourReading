const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getAllArticles(req) {
  //check if there is take and skip in the query
  //if there is no take and skip we return all the articles but in descending order by time of creation
  if (!req.query.take && !req.query.skip) {
    return prisma.article.findMany({
      orderBy: {
        createdAt: "desc", //desc for descending order from the newest to the oldest
      },
    });
  }
  //if there is take and skip we return the articles we return the 10 first articles depending on time of creation
  else {
    return prisma.article.findMany({
      //I need to return the 10 first articles depending on the time of creation
      take: +req.query.take,
      skip: +req.query.skip,
      orderBy: {
        createdAt: "desc", //desc for descending order from the newest to the oldest
      },
    });
  }
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

async function deleteArticle(id) {
  //we need to delete all the comments of this article before deleting the article
  await prisma.commentaire.deleteMany({
    where: {
      idarticle: +id,
    },
  });

  //we delete all the relations between the article and the categories before deleting the article
  await prisma.articleCategorie.deleteMany({
    where: {
      idarticle: +id,
    },
  });

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
