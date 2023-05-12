// we use a model folder to make the code more readable and to separate the logic from the routes

//in the models we need to import the prisma client to CRUD the database

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getAllUsers() {
  return prisma.user.findMany();
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
function addUser(user) {
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

function deleteUser(id) {
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
