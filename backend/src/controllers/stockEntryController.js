const { createStockEntry, getStockEntries, generateUniqueEntryId } = require('../models/stockEntry');

exports.addStockEntry = async (req, res) => {
  const { tanggal, type, details } = req.body;

  if (!tanggal || !type || !details || !Array.isArray(details) || details.length === 0) {
    return res.status(400).json({
      error: 'Invalid input. Ensure tanggal, type, and details are provided, and details is a non-empty array.',
    });
  }

  try {
    const response = await createStockEntry({ tanggal, type, details }); 
    res.status(201).json(response); 
  } catch (error) {
    console.error('Error adding Stock Entry:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getStockEntries = async (req, res) => {
  try {
    const stockEntries = await getStockEntries();

    
    res.status(200).json(stockEntries);
  } catch (error) {
    console.error('Error fetching Stock Entries:', error);
    res.status(500).json({ error: error.message });
  }
};
