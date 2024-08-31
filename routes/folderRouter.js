const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

folderRouter.get("/:folderId", folderController.viewFolder);
folderRouter.get("/:folderId/edit", folderController.getRenameFolder);
folderRouter.post("/:folderId/edit", folderController.renameFolder);
folderRouter.get("/:folderId/delete", folderController.deleteFolder);

module.exports = folderRouter;
