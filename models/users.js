// we use a model folder to make the code more readable and to separate the logic from the routes

//in the models we need to import the prisma client to CRUD the database

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//the getAllUsers function accepte two parameters take and skip to make pagination
function getAllUsers(take, skip) {
  //if there is no take and skip we return all the users
  if (take == 0 && skip == 0) {
    return prisma.user.findMany({});
  } else
    return prisma.user.findMany({
      take: take,
      skip: skip,
    });
}

function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      iduser: parseInt(id),
    },
  });
}
function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}
async function addUser(user) {
  //verify if the user allready exist or not
  const test = await getUserByEmail(user.email);

  if (test) {
    return 0;
  }
  //create return a promise
  return prisma.user.create({
    data: user,
  });
}

function updateUser(id, user) {
  return prisma.user.update({
    where: { iduser: +id },
    data: user,
  });
}

async function deleteUser(id) {
  //we need to verifiy that the user doesnt have any articles or comments before deleting him
  //I need to give him the choice to delete all his articles and comments before deleting his account, as follow: i need to add a button yes/no to delete all the article and comments before deleting the account
  const countArticles = await prisma.article.count({
    where: {
      iduser: +id,
    },
  });
  const countComments = await prisma.commentaire.count({
    where: {
      iduser: +id,
    },
  });
  console.log(countArticles, countComments);
  if (countArticles > 0 || countComments > 0) {
    //we need to give him the choice to delete all his articles and comments before deleting his account

    //we need to delete all his articles and comments
    await prisma.commentaire.deleteMany({
      where: {
        iduser: +id,
      },
    });

    await prisma.article.deleteMany({
      where: {
        iduser: +id,
      },
    });
  }

  return prisma.user.delete({
    where: { iduser: +id },
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
};
