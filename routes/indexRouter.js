const { Router } = require("express");
// const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
});
// indexRouter.get("/delete/:messageId", indexController.deleteMessage);

module.exports = indexRouter;
