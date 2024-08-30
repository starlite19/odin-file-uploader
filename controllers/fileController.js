const db = require("../db/queries");

async function viewFile(req, res) {
  const fileId = req.params.fileId;
  const file = await db.findFolderById(fileId);
  res.render("file", { file: file });
}

async function renameFile(req, res) {
  console.log("rename file");
}

async function deleteFile(req, res) {
  const fileId = req.params.fileId;
  const file = await db.findFolderById(fileId);
  const folderId = file.folderId;
  await db.deleteFileById(fileId);
  res.redirect(`/folder/${folderId}`);
}

module.exports = {
  viewFile,
  renameFile,
  deleteFile,
};
