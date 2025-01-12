const { createItem, getItems } = require('../models/item');


const addItem = async (req, res) => {
  try {
    const item = req.body;
    const newItem = await createItem(item);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item', error: err });
  }
};


const getAllItems = async (req, res) => {
  try {
    const items = await getItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve items', error: err });
  }
};

module.exports = { addItem, getAllItems };
