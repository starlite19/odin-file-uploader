const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

async function getUserForm(req, res) {
  res.render("signup");
}

const validateUser = () => [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty.")
    .custom(async (value) => {
      const user = await db.findUserByName(value);
      if (user) {
        throw new Error("Username already in use.");
      }
    }),
  body("password").trim().notEmpty().withMessage("Password cannot be empty."),
];

async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }
  const { username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(400).render("signup", {
        errors: [{ msg: "Error signing up." }],
      });
    }
    // otherwise, store hashedPassword in DB
    await db.addUser(username, hashedPassword);
  });
  res.redirect("/");
}

async function createFolder(req, res) {
  const user = req.user;
  const folder = await db.addFolder(user.id);
  res.redirect("/");
}

async function createSubfolder(req, res) {
  const parentId = req.params.folderId;
  const user = req.user;
  await db.addSubfolder(parentId, user.id);
  res.redirect(`/folder/${parentId}`);
}

module.exports = {
  getUserForm,
  validateUser,
  createUser,
  createFolder,
  createSubfolder,
};
