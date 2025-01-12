import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

function StockEntryList() {
  const [entries, setEntries] = useState([]);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };

  useEffect(() => {
    fetch(`${API_URL}/api/stock-entries`)
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error("Error fetching stock entries:", error));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md">
      <h2 className="text-white text-2xl font-semibold mb-4">Stock Entry List</h2>
      <table className="table-auto w-full text-left text-sm text-gray-400 text-center">
        <thead className="bg-gray-700 text-gray-300 border-b border-gray-700">
          <tr>
            <th className="px-4 py-3 text-lg">Entry ID</th>
            <th className="px-4 py-3 text-lg">Date</th>
            <th className="px-4 py-3 text-lg">Type</th>
            <th className="px-4 py-3 text-lg">Item Code</th>
            <th className="px-4 py-3 text-lg">Batch ID</th>
            <th className="px-4 py-3 text-lg">Expiry Date</th>
            <th className="px-4 py-3 text-lg">Quantity</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 ">
          {entries.map((entry, index) => (
            <tr
              key={index}
              className="hover:bg-gray-700 transition duration-150 ease-in-out border-b border-gray-700 text-white"
            >
              <td className="px-4 py-3 text-base">{entry.entry_id}</td>
              <td className="px-4 py-3 text-base">{formatDate(entry.tanggal)}</td>
              <td className="px-4 py-3 text-base">{entry.type}</td>
              <td className="px-4 py-3 text-base">{entry.item_code}</td>
              <td className="px-4 py-3 text-base">{entry.batch_id}</td>
              <td className="px-4 py-3 text-base">{formatDate(entry.expiry_date)}</td>
              <td className="px-4 py-3 text-base">{entry.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockEntryList;
