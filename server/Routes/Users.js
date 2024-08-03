// This file establishes the routes needed for the user collection

const express = require("express");
const router = express.Router();
const UserModel = require("../Models/Users");

// general POST request for testing
router.post("/", async (req, res) => {
  const { FirstName } = req.body;
  try {
    const user = await UserModel.create({
      FirstName: FirstName,
    });
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

// genearl GET request for testing
router.get("/getUsers", async (req, res) => {
  UserModel.find().then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
