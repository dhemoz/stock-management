const express = require('express');
const router = express.Router();
const { addStockEntry, getStockEntries } = require('../controllers/stockEntryController');

// Route untuk menambah Stock Entry
router.post('/', addStockEntry);

// Route untuk mendapatkan daftar Stock Entries
router.get('/', getStockEntries);

module.exports = router;
