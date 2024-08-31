const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUserByName(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: { folders: true },
  });

  return user;
}

async function findUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: { folders: true },
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
      id: parseInt(id),
    },
  });
  return folder;
}

async function deleteFolderById(id) {
  await prisma.folder.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function findFileById(id) {
  const file = await prisma.file.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return file;
}

async function deleteFileById(id) {
  await prisma.file.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function changeFileName(id, name) {
  const updateFile = await prisma.file.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
    },
  });
  return updateFile;
}

async function changeFolderName(id, name) {
  await prisma.folder.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
    },
  });
}

async function addFolder(userId) {
  const newFolder = await prisma.folder.create({
    data: {
      name: "New folder",
      user: {
        connect: { id: userId },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      folders: {
        connect: {
          id: newFolder.id,
        },
      },
    },
    include: {
      folders: true,
    },
  });
  return newFolder;
}

module.exports = {
  findUserByName,
  findUserById,
  addUser,
  findFolderById,
  deleteFolderById,
  findFileById,
  deleteFileById,
  changeFileName,
  changeFolderName,
  addFolder,
};
