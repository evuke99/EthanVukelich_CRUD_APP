// This file establishes the routes needed for the user collection

const express = require("express");
const router = express.Router();
const UserModel = require("../Models/Users");
const UsersController = require("../Controllers/UsersController");

// POST Request for a user
router.post("/", UsersController.createUser);

// GET request for all users
router.get("/", UsersController.getUsers);

// GET request by ID
router.get("/:id", UsersController.getUserByID);

// DELETE request by ID
router.delete("/:id", UsersController.deleteUser);

// PATCH request by ID
router.patch("/:id", UsersController.updateUser);

module.exports = router;
