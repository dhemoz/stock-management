const express = require('express');
const { addStockLedger, getAllStockLedgers } = require('../controllers/stockLedgerController');
const router = express.Router();

// Route untuk menambah stock ledger
router.post('/', addStockLedger);

// Route untuk mendapatkan semua stock ledger
router.get('/', getAllStockLedgers);

module.exports = router;
