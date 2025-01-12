const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'stock_management',
  password: '123456',
  port: 5432,
});


const createBatch = async (batch) => {
  const { batch_id, item_code, expiry_date } = batch;
  const result = await pool.query(
    'INSERT INTO batch (batch_id, item_code, expiry_date) VALUES ($1, $2, $3) RETURNING *',
    [batch_id, item_code, expiry_date]
  );
  return result.rows[0];
};


const getBatches = async () => {
  const result = await pool.query('SELECT * FROM batch');
  return result.rows;
};

module.exports = { createBatch, getBatches };
