const express = require('express');
const cors = require('cors');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


// Root Route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Routes (endpoint untuk Item, Batch, Stock Entry, Stock Ledger)
const itemRoutes = require('./routes/itemRoutes');
const batchRoutes = require('./routes/batchRoutes');
const stockEntryRoutes = require('./routes/stockEntryRoutes');
const stockLedgerRoutes = require('./routes/stockLedgerRoutes');

app.use('/api/items', itemRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/stock-entries', stockEntryRoutes);
app.use('/api/stock-ledgers', stockLedgerRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
