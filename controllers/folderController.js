const db = require("../db/queries");

async function viewFolder(req, res) {
  const folderId = req.params.folderId;
  const folder = await db.findFolderById(folderId);
  res.render("folder", { folder: folder });
}

async function renameFolder(req, res) {
  console.log("rename folder");
}

async function deleteFolder(req, res) {
  const folderId = req.params.folderId;
  await db.deleteFolderById(folderId);
  res.redirect(`/folder/${folderId}`);
}

module.exports = {
  viewFolder,
  renameFolder,
  deleteFolder,
};
