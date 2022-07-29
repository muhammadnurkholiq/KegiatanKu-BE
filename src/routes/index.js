// express
const express = require("express");

// router
const router = express.Router();

// middlewares
const { auth } = require("../middlewares/auth");

// controllers
// auth
const { register, login, checkAuth } = require("../controllers/auth");

// user
const { updateUser, deleteUser } = require("../controllers/user");

// admin
const {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminDeleteUser,
} = require("../controllers/admin");

// todo
const {
  addTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

// route
// auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// user
router.put("/users", auth, updateUser);
router.delete("/users", auth, deleteUser);

// admin
router.get("/admin", auth, adminGetUsers);
router.get("/admin/:id", auth, adminGetUser);
router.put("/admin/:id", auth, adminUpdateUser);
router.delete("/admin/:id", auth, adminDeleteUser);

// todo
router.post("/todos", auth, addTodo);
router.get("/todos", auth, getTodos);
router.get("/todos/:id", auth, getTodo);
router.put("/todos/:id", auth, updateTodo);
router.delete("/todos/:id", auth, deleteTodo);

// export
module.exports = router;
