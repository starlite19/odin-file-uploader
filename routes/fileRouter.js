const { Router } = require("express");
const fileController = require("../controllers/fileController");
const fileRouter = Router();

fileRouter.get("/:fileId", fileController.viewFile);
fileRouter.get("/:fileId/edit", fileController.getRenameFile);
fileRouter.post("/:fileId/edit", fileController.renameFile);
fileRouter.get("/:fileId/delete", fileController.deleteFile);

fileRouter.get("/upload/:folderId", fileController.getUploadForm);
fileRouter.post(
  "/upload/:folderId",
  fileController.upload.single("file"),
  fileController.uploadForm
);

module.exports = fileRouter;
