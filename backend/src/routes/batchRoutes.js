const express = require('express');
const { addBatch, getAllBatches } = require('../controllers/batchController');
const router = express.Router();

// Route untuk menambah batch
router.post('/', addBatch);

// Route untuk mendapatkan semua batch
router.get('/', getAllBatches);

module.exports = router;
