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

// async function getMessageForm(req, res) {
//   res.render("new-message-form");
// }

// async function createMessage(req, res) {
//   const user = req.user;
//   const { title, message } = req.body;
//   await create_db.insertMessage(user.id, title, message);
//   res.redirect("/");
// }

module.exports = {
  getUserForm,
  validateUser,
  createUser,
  //   getMessageForm,
  //   createMessage,
};
