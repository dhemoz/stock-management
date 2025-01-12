const { createBatch, getBatches } = require('../models/batch');


const addBatch = async (req, res) => {
  try {
    const batch = req.body;
    const newBatch = await createBatch(batch);
    res.status(201).json(newBatch);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add batch', error: err });
  }
};


const getAllBatches = async (req, res) => {
  try {
    const batches = await getBatches();
    res.status(200).json(batches);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve batches', error: err });
  }
};

module.exports = { addBatch, getAllBatches };
