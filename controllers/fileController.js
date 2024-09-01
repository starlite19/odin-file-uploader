const db = require("../db/queries");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const fileName = `${basename}-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

// const upload = multer({ dest: "../public" });
const upload = multer({ storage: storage });

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

async function getUploadForm(req, res) {
  const folderId = req.params.folderId;
  let backUrl = `/folder/${folderId}`;
  res.render("file-upload", { folderId: folderId, backUrl: backUrl });
}

async function uploadForm(req, res) {
  const folderId = req.params.folderId;
  const file = req.file;
  await db.addFile(file.originalname, file.path, file.size, folderId);
  res.redirect(`/folder/${folderId}`);
}

module.exports = {
  viewFile,
  getRenameFile,
  renameFile,
  deleteFile,
  getUploadForm,
  upload,
  uploadForm,
};
