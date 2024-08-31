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
  const backUrl = "/";
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
  res.redirect("/");
}

async function deleteFolder(req, res) {
  const folderId = req.params.folderId;
  await db.deleteFolderById(folderId);
  res.redirect("/");
}

module.exports = {
  viewFolder,
  getRenameFolder,
  renameFolder,
  deleteFolder,
};
