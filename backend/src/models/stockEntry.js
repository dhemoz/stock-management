const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "stock_management",
  password: "123456",
  port: 5432,
});

const generateUniqueEntryId = async (type) => {
  if (type === "IN") {
    return "SE001";
  }
  if (type === "OUT") {
    return "SE002";
  }

  throw new Error(`Invalid type: ${type}`);
};

const generateUniqueBatchId = async (item_code) => {
  const query = `
    SELECT MAX(batch_id) AS last_batch_id
    FROM batch
    WHERE item_code = $1
  `;
  const result = await pool.query(query, [item_code]);
  const lastBatchId = result.rows[0]?.last_batch_id;

  // Jika batch ID terakhir ditemukan, ambil bagian angka, lalu tambah 1
  const nextBatchNumber = lastBatchId
    ? parseInt(lastBatchId.slice(item_code.length)) + 1
    : 1;

  // Format ID dengan item_code sebagai prefix
  const newBatchId = `${item_code}${String(nextBatchNumber).padStart(3, "0")}`;
  return newBatchId;
};

const checkDuplicate = async (client, entry_id, item_code, batch_id) => {
  const query = `
    SELECT 1
    FROM stock_entry_detail
    WHERE entry_id = $1 AND item_code = $2 AND batch_id = $3
  `;
  const result = await client.query(query, [entry_id, item_code, batch_id]);
  return result.rows.length > 0; // Mengembalikan true jika duplikat ditemukan
};


const createStockEntry = async (stockEntry) => {
  const { tanggal, type, details } = stockEntry;

  
  const entry_id = await generateUniqueEntryId(type);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    
    const entryExists = await client.query(
      "SELECT 1 FROM stock_entry WHERE entry_id = $1 AND type = $2",
      [entry_id, type]
    );

    
    if (entryExists.rowCount === 0) {
      await client.query(
        "INSERT INTO stock_entry (entry_id, tanggal, type) VALUES ($1, $2, $3)",
        [entry_id, tanggal, type]
      );
    }

    
    for (const detail of details) {
      const { item_code, batch_id, expiry_date, qty } = detail;

      if (!item_code) {
        throw new Error("item_code is required in details.");
      }

      console.log("Processing item_code:", item_code);

      let lastStock = 0;
      let qtyIn = 0;
      let qtyOut = 0;
      let currentStock = 0;

      if (type === "OUT") {
        
        if (!batch_id) {
          throw new Error(
            `Batch ID is required for type OUT and item_code: ${item_code}.`
          );
        }
      
        
        const batchResult = await client.query(
          `SELECT batch_id, current_stock 
           FROM stock_ledger 
           WHERE item_code = $1 AND batch_id = $2 AND current_stock > 0
           LIMIT 1`,
          [item_code, batch_id]
        );
      
        if (batchResult.rows.length === 0) {
          throw new Error(
            `Batch ID ${batch_id} is not valid or has no available stock for item_code: ${item_code}.`
          );
        }
      
        console.log("Batch Result:", batchResult.rows);
      
        const lastStock = parseInt(batchResult.rows[0]?.current_stock || 0, 10);
        const qtyOut = qty;
        const currentStock = lastStock - qtyOut;
      
        if (currentStock < 0) {
          throw new Error(
            `Insufficient stock for item_code: ${item_code}, batch_id: ${batch_id}.`
          );
        }
      
        console.log("Current Stock After OUT:", currentStock);
      
       
        await client.query(
          `INSERT INTO stock_ledger (item_code, batch_id, tanggal, last_stock, qty_in, qty_out, current_stock)
           VALUES ($1, $2, $3, $4, 0, $5, $6)
           ON CONFLICT (item_code, batch_id, tanggal) 
           DO UPDATE SET 
             last_stock = EXCLUDED.last_stock,
             qty_out = stock_ledger.qty_out + EXCLUDED.qty_out,
             current_stock = EXCLUDED.current_stock`,
          [item_code, batch_id, tanggal, lastStock, qtyOut, currentStock]
        );
      
        console.log("Stock ledger updated successfully for OUT operation.");
      
       
        const entryDetailExists = await client.query(
          `SELECT 1 FROM stock_entry_detail 
           WHERE entry_id = $1 AND item_code = $2 AND batch_id = $3`,
          [entry_id, item_code, batch_id]
        );
      
        if (entryDetailExists.rows.length > 0) {
          
          await client.query(
            `UPDATE stock_entry_detail
             SET qty = qty + $1
             WHERE entry_id = $2 AND item_code = $3 AND batch_id = $4`,
            [qtyOut, entry_id, item_code, batch_id]
          );
          console.log("Updated existing stock_entry_detail for OUT operation.");
        } else {
          
          await client.query(
            `INSERT INTO stock_entry_detail (entry_id, item_code, batch_id, expiry_date, qty)
             VALUES ($1, $2, $3, $4, $5)`,
            [entry_id, item_code, batch_id, expiry_date, qtyOut]
          );
          console.log("Inserted new entry into stock_entry_detail for OUT operation.");
        }
      }
      

      if (type === "IN") {
        const newBatchId = await generateUniqueBatchId(item_code);

        console.log("Generated Batch ID for IN:", newBatchId);

        
        await client.query(
          "INSERT INTO batch (batch_id, item_code, expiry_date) VALUES ($1, $2, $3) ON CONFLICT (batch_id) DO NOTHING",
          [newBatchId, item_code, expiry_date || null]
        );

        const lastStockRes = await client.query(
          "SELECT current_stock FROM stock_ledger WHERE item_code = $1 AND batch_id = $2 ORDER BY tanggal DESC LIMIT 1",
          [item_code, newBatchId]
        );

        lastStock =
          lastStockRes.rows.length > 0
            ? parseInt(lastStockRes.rows[0].current_stock || 0, 10)
            : 0;
        qtyIn = qty;
        currentStock = lastStock + qtyIn;

        console.log(
          `Item: ${item_code}, Batch ID: ${newBatchId}, Current Stock: ${currentStock}`
        );

        
        await client.query(
          `INSERT INTO stock_ledger (item_code, batch_id, tanggal, last_stock, qty_in, qty_out, current_stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (item_code, batch_id, tanggal) 
           DO UPDATE SET
             last_stock = EXCLUDED.last_stock,
             qty_in = stock_ledger.qty_in + EXCLUDED.qty_in,
             qty_out = stock_ledger.qty_out + EXCLUDED.qty_out,
             current_stock = stock_ledger.current_stock + EXCLUDED.qty_in - EXCLUDED.qty_out`,
          [
            item_code,
            newBatchId,
            tanggal,
            lastStock,
            qtyIn,
            qtyOut,
            currentStock,
          ]
        );

        // **Tambahkan ke stock_entry_detail**
        await client.query(
          `INSERT INTO stock_entry_detail (entry_id, item_code, batch_id, expiry_date, qty)
           VALUES ($1, $2, $3, $4, $5)`,
          [entry_id, item_code, newBatchId, expiry_date, qty]
        );

        console.log(`Stock Entry Detail added for batch ID: ${newBatchId}`);
      }

      console.log("Inserted into stock_entry_detail:", {
        entry_id,
        item_code,
        batch_id,
        expiry_date,
        qty,
      });
    }

    await client.query("COMMIT");
    return { message: "Stock Entry successfully added.", entry_id };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding Stock Entry:", error);
    throw error;
  } finally {
    client.release();
  }
};
// Get All Stock Entries
const getStockEntries = async () => {
  const query = `
    SELECT 
    se.entry_id,
 	sl.tanggal,
    se.type,
    sed.item_code,
    sed.batch_id,
    b.expiry_date,
    sed.qty,
    sl.current_stock
FROM stock_entry se
LEFT JOIN stock_entry_detail sed ON se.entry_id = sed.entry_id
LEFT JOIN stock_ledger sl ON sed.batch_id = sl.batch_id AND sed.item_code = sl.item_code
LEFT JOIN batch b ON sed.batch_id = b.batch_id
ORDER BY sl.tanggal DESC, sl.item_code ASC ;
  `;
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  createStockEntry,
  getStockEntries,
  generateUniqueBatchId,
  generateUniqueEntryId,
};
