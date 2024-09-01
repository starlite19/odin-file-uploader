const db = require("../db/queries");

async function viewFolder(req, res) {
  const folderId = req.params.folderId;
  const folder = await db.findFolderById(folderId);
  res.render("folder", { folder: folder });
}

async function getRenameFolder(req, res) {
  const folderId = req.params.folderId;
  const folder = await db.findFolderById(folderId);
  console.log("folder", folder);
  let backUrl = "/";
  if (folder.parentId) {
    backUrl = `/folder/${folder.parentId}`;
  }
  res.render("edit", {
    item: "folder",
    id: folderId,
    value: folder.name,
    backUrl: backUrl,
  });
}

async function renameFolder(req, res) {
  const folderId = req.params.folderId;
  const { name } = req.body;
  await db.changeFolderName(folderId, name);
  const newFolder = await db.findFolderById(folderId);
  if (newFolder.parentId) {
    res.redirect(`/folder/${newFolder.parentId}`);
  } else {
    res.redirect("/");
  }
}

async function deleteFolder(req, res) {
  const folderId = req.params.folderId;
  const folder = await db.findFolderById(folderId);
  const parentId = folder.parentId;
  await db.deleteFolderById(folderId);
  if (parentId) {
    res.redirect(`/folder/${parentId}`);
  } else {
    res.redirect("/");
  }
}

module.exports = {
  viewFolder,
  getRenameFolder,
  renameFolder,
  deleteFolder,
};
