import React, { useState, useEffect } from "react";
import { API_URL } from "../api";

function StockLedgerReport() {
  const [stockLedger, setStockLedger] = useState([]);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };

  useEffect(() => {
    fetch(`${API_URL}/api/stock-ledgers`)
      .then((res) => res.json())
      .then((data) => setStockLedger(data))
      .catch((error) => console.error("Error fetching stock ledger:", error));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md">
      <h1 className="text-white text-2xl font-semibold mb-4 text-center">
        Stock Ledger Report
      </h1>
      <table className="table-auto w-full text-left text-sm text-gray-400 text-center">
        <thead className="bg-gray-700 text-gray-300 border-b border-gray-700">
          <tr>
            <th className="px-4 py-3 text-lg">Tanggal</th>
            <th className="px-4 py-3 text-lg">Item Code</th>
            <th className="px-4 py-3 text-lg">Item Name</th>
            <th className="px-4 py-3 text-lg">Batch ID</th>
            <th className="px-4 py-3 text-lg">Last Stock</th>
            <th className="px-4 py-3 text-lg">Qty In</th>
            <th className="px-4 py-3 text-lg">Qty Out</th>
            <th className="px-4 py-3 text-lg">Current Stock</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {Array.isArray(stockLedger) && stockLedger.length > 0 ? (
            stockLedger.map((entry, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition duration-150 ease-in-out border-b border-gray-700 text-white"
              >
                <td className="px-4 py-3 text-base">{formatDate(entry.tanggal)}</td>
                <td className="px-4 py-3 text-base">{entry.item_code}</td>
                <td className="px-4 py-3 text-base">{entry.item_name || "N/A"}</td>
                <td className="px-4 py-3 text-base">{entry.batch_id}</td>
                <td className="px-4 py-3 text-base">{entry.last_stock}</td>
                <td className="px-4 py-3 text-base">{entry.qty_in}</td>
                <td className="px-4 py-3 text-base">{entry.qty_out}</td>
                <td className="px-4 py-3 text-base">{entry.current_stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center px-4 py-3 text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockLedgerReport;
