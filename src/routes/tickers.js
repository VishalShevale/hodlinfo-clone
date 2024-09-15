const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/tickers.json');

// API Route to serve ticker data
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }
    const tickers = JSON.parse(data);
    res.json(tickers);
  });
});

module.exports = router;
