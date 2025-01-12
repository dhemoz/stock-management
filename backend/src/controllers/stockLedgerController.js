const { createStockLedger, getStockLedgers } = require('../models/stockLedger');


const addStockLedger = async (req, res) => {
  try {
    const ledger = req.body;
    const newLedger = await createStockLedger(ledger);
    res.status(201).json(newLedger);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add stock ledger', error: err });
  }
};


const getAllStockLedgers = async (req, res) => {
  try {
    const stockLedgers = await getStockLedgers();
    res.status(200).json(stockLedgers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve stock ledgers', error: err });
  }
};

module.exports = { addStockLedger, getAllStockLedgers };
