const { Router } = require("express");
const createController = require("../controllers/createController");
const createRouter = Router();

createRouter.get("/user", createController.getUserForm);
createRouter.post(
  "/user",
  createController.validateUser(),
  createController.createUser
);

createRouter.get("/folder", createController.createFolder);
createRouter.get("/:folderId/subfolder", createController.createSubfolder);
// createRouter.post("/folder", createController.createMessage);

module.exports = createRouter;
