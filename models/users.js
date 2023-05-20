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
  const user = await prisma.user.findUnique({
    where: { iduser: +id },
    include: {
      article: true,
      commentaire: true,
    },
  });

  if (user == null) {
    return 0;
  }
  // Delete the user directly
  return await prisma.user.delete({
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
