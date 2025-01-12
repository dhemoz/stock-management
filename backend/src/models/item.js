const { Pool } = require('pg');

// Set up database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stock_management',
    password: '123456',
    port: 5432,
});


const createItem = async (item) => {
  const { item_code, name, uom } = item;
  const result = await pool.query(
    'INSERT INTO item (item_code, name, uom) VALUES ($1, $2, $3) RETURNING *',
    [item_code, name, uom]
  );
  return result.rows[0];
};

const getItems = async () => {
  const result = await pool.query('SELECT * FROM item');
  return result.rows;
};

module.exports = { createItem, getItems };
