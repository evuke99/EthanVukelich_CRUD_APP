const UserModel = require("../Models/Users");
const mongoose = require("mongoose");

// Creates a single user in the database
const createUser = async (req, res) => {
  const { FirstName, LastName, Username, Password } = req.body;
  try {
    const user = await UserModel.create({
      FirstName: FirstName,
      LastName: LastName,
      Username: Username,
      Password: Password,
    });
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

// Lists out all of the users
const listAllUsers = (req, res) => {
  UserModel.find().then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

// Gets a single user by its ID
const getUserByID = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No user found, invalid ID" });
  }
  UserModel.findById(id).then((err, result) => {
    if (!id) {
      return res.status(400).json({ error: "No user found" });
    }
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

// Deletes a single user by its ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found, invalid ID" });
  }
  const user = await UserModel.findOneAndDelete({ _id: id });
  if (!id) {
    return res.status(400).json({ error: "No user found" });
  }
  res.status(200).json(user);
};

// Updates a single user by its ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found, invalid ID" });
  }
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!id) {
    return res.status(400).json({ error: "No user found" });
  }
  res.status(200).json(user);
};

module.exports = {
  createUser,
  listAllUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
