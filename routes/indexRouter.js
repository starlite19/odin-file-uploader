const { Router } = require("express");
// const indexController = require("../controllers/indexController");
const indexRouter = Router();
const db = require("../db/queries");

indexRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

indexRouter.get("/download/:fileId", async (req, res) => {
  // const fileName = req.params.fileName;
  const fileId = req.params.fileId;
  const file = await db.findFileById(fileId);
  // const filePath = path.join(__dirname, "files", fileName);

  res.download(file.path);
});
// indexRouter.get("/delete/:messageId", indexController.deleteMessage);

module.exports = indexRouter;
