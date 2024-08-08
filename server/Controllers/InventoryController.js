const InventoryModel = require("../Models/Inventory");
const mongoose = require("mongoose");

// Creates a single item in the database
const createItem = async (req, res) => {
  const Item = ({ UserId, ItemName, Description, Quantity } = req.body);

  try {
    const item = await InventoryModel.create(Item);
    res.status(200).json(item);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

// Lists out all of the users
const getItems = async (req, res) => {
  const items = await InventoryModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

//Lists out all items that have the UserId of the currently logged in user
const getUserItems = async (req, res) => {
  const items = await InventoryModel.find({ UserId: req.params.UserId }).sort({
    createdAt: -1,
  });
  res.status(200).json(items);
};

module.exports = { createItem, getItems, getUserItems };
