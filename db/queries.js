const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUserByName(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}

async function findUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}

async function addUser(username, password) {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
      folders: {
        create: {
          name: "First folder",
        },
      },
    },
  });
}

async function findFolderById(id) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: id,
    },
  });
  return folder;
}

async function deleteFolderById(id) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

async function findFileById(id) {
  const file = await prisma.file.findUnique({
    where: {
      id,
      id,
    },
  });
  return file;
}

async function deleteFileById(id) {
  await prisma.file.delete({
    where: {
      id: id,
    },
  });
}

module.exports = {
  findUserByName,
  findUserById,
  addUser,
  findFolderById,
  deleteFolderById,
  findFileById,
  deleteFileById,
};
