const db = require("../db/queries");

async function viewFile(req, res) {
  const fileId = req.params.fileId;
  const file = await db.findFileById(fileId);
  res.render("file", { file: file });
}

async function getRenameFile(req, res) {
  const fileId = req.params.fileId;
  const file = await db.findFileById(fileId);
  const backUrl = `/folder/${file.folderId}`;
  res.render("edit", {
    item: "file",
    id: fileId,
    value: file.name,
    backUrl: backUrl,
  });
}

async function renameFile(req, res) {
  const fileId = req.params.fileId;
  const { name } = req.body;
  const updateFile = await db.changeFileName(fileId, name);
  res.redirect(`/folder/${updateFile.folderId}`);
}

async function deleteFile(req, res) {
  const fileId = req.params.fileId;
  const file = await db.findFileById(fileId);
  const folderId = file.folderId;
  await db.deleteFileById(fileId);
  res.redirect(`/folder/${folderId}`);
}

module.exports = {
  viewFile,
  getRenameFile,
  renameFile,
  deleteFile,
};
