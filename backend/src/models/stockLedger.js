const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "stock_management",
  password: "123456",
  port: 5432,
});

// Create Stock Ledger
const createStockLedger = async (ledger) => {
  const {
    item_code,
    batch_id,
    tanggal,
    last_stock,
    qty_in,
    qty_out,
    current_stock,
  } = ledger;
  const result = await pool.query(
    "INSERT INTO stock_ledger (item_code, batch_id, tanggal, last_stock, qty_in, qty_out, current_stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [item_code, batch_id, tanggal, last_stock, qty_in, qty_out, current_stock]
  );
  return result.rows[0];
};

// Get All Stock Ledgers
const getStockLedgers = async () => {
  const query = `
    SELECT 
      sl.tanggal,
      sl.item_code,
      i.name AS item_name,  -- Ambil nama item dari tabel item
      sl.batch_id,
      sl.last_stock,
      sl.qty_in,
      sl.qty_out,
      sl.current_stock
    FROM 
      stock_ledger sl
    LEFT JOIN 
      item i
    ON 
      sl.item_code = i.item_code
    ORDER BY sl.tanggal DESC, sl.item_code ASC;

  `;
  const result = await pool.query(query);
  console.log("Stock Ledger Data:", result.rows); // Tambahkan log
  return result.rows;
};
module.exports = { createStockLedger, getStockLedgers };
