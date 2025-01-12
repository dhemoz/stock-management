const express = require('express');
const { addItem, getAllItems } = require('../controllers/itemController');
const router = express.Router();

// Route untuk menambah item
router.post('/', addItem);

// Route untuk mendapatkan semua item
router.get('/', getAllItems);

module.exports = router;
