import React, { useState } from "react";
import { API_URL } from "../api";

function StockEntryForm() {
  const [entry, setEntry] = useState({
    entry_id: "",
    tanggal: "",
    type: "IN",
  });
  const [details, setDetails] = useState([
    { item_code: "", expiry_date: "", qty: "" }, 
  ]);

  
  const handleEntryChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  
    
    if (name === "type") {
      const defaultDetails =
        value === "IN"
          ? [{ item_code: "", expiry_date: "", qty: "" }] 
          : [{ item_code: "", batch_id: "", expiry_date: "", qty: "" }]; 
      setDetails(defaultDetails);
    }
  };

  // Handle changes for details 
  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...details];
    updatedDetails[index][name] = value;
    setDetails(updatedDetails);
  };

  const addDetailRow = () => {
    const newDetail =
      entry.type === "IN"
        ? { item_code: "", expiry_date: "", qty: "" } 
        : { item_code: "", batch_id: "", expiry_date: "", qty: "" }; 
    setDetails([...details, newDetail]);
  };

  const removeDetailRow = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    for (let detail of details) {
      if (!detail.item_code || !detail.qty) {
        alert("Item Code and Quantity are required.");
        return;
      }
      if (entry.type === "OUT" && !detail.batch_id) {
        alert("Batch ID is required for type OUT.");
        return;
      }
    }
  
    const filteredDetails = details.map((detail) => {
      const { item_code, expiry_date, qty, batch_id } = detail;
      return entry.type === "IN"
        ? { item_code, expiry_date, qty } 
        : { item_code, batch_id, expiry_date, qty }; 
    });
  
    const stockEntryData = { ...entry, details: filteredDetails };
    console.log("Data sent for Stock Entry:", stockEntryData);
  
    fetch(`${API_URL}/api/stock-entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stockEntryData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to add stock entry");
      })
      .then((data) => {
        alert(`Stock Entry ${data.entry_id} added successfully!`);
        
        setEntry({ entry_id: data.entry_id, tanggal: "", type: "IN" });
        setDetails([{ item_code: "", expiry_date: "", qty: "" }]);
      })
      .catch((error) => {
        console.error("Error adding Stock Entry:", error);
        alert(`Error adding Stock Entry: ${error.message}`);
      });
  };


  return (
    <div className="container mx-auto p-6 pb-10 bg-gray-800 rounded-md">
      <div className="pb-2">
        <h2 className="text-xl font-semibold text-white">Stock Entry Form</h2>
        <p className="mt-1 text-sm/6 text-gray-300">
          This form is used to record all stock movements in your inventory.
          Ensure to provide accurate information to maintain the integrity of
          your stock records.
        </p>
      </div>

      <div div className="bg-white rounded-lg shadow-md p-2">
        <ul className="pl-2">
          <form onSubmit={handleSubmit}>
            <li className="py-1 mt-1">
              <div className="sm:col-span-4">
                <label className="mr-2 text-m/6 font-medium text-gray-900">
                  Entry ID:
                </label>
                <select
                  type="text"
                  name="entry_id"
                  value={entry.entry_id}
                  onChange={handleEntryChange}
                  className="min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                >
                  <option value="SE001">SE001</option>
                  <option value="SE002">SE002</option>
                </select>
              </div>
            </li>
            <li className="py-1 mt-1">
              <div className="sm:col-span-4">
                <label className="mr-2 text-m/6 font-medium text-gray-900">
                  Tanggal:
                </label>
                <input
                  type="date"
                  name="tanggal"
                  value={entry.tanggal}
                  onChange={handleEntryChange}
                  required
                  className=" min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
            </li>
            <li className="py-1 mt-1">
              <div className="sm:col-span-4">
                <label className="mr-8 text-m/6 font-medium text-gray-900">
                  Type:
                </label>
                <select
                  name="type"
                  value={entry.type}
                  onChange={handleEntryChange}
                  required
                  className="min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                >
                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>
                </select>
              </div>
            </li>
            <ul className="pl-2 border-t mt-2">
              <li className="py-1 mt-1">
                <h3 className="text-lg font-semibold">Details</h3>
              </li>
              {details.map((detail, index) => (
                <div className="my-1 mr-4 flex items-center ">
                  <div key={index}>
                    <div>
                      <label className="mr-1 text-m/6 text-gray-900">
                        Item Code:
                      </label>
                      <input
                        type="text"
                        name="item_code"
                        value={detail.item_code}
                        onChange={(e) => handleDetailChange(index, e)}
                        required
                        className="min-w-0 w-32 grow mr-2 p-2 text-sm text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                      />
                      {entry.type === "OUT" && (
                        <>
                          <label className="mr-2 text-m/6 text-gray-900">
                            Batch ID:
                          </label>
                          <input
                            type="text"
                            name="batch_id"
                            value={detail.batch_id || ""}
                            onChange={(e) => handleDetailChange(index, e)}
                            required
                            className="min-w-0 w-32 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                          />
                        </>
                      )}
                      <label className="mx-2 text-m/6 text-gray-900">
                        Expiry Date:
                      </label>
                      <input
                        type="date"
                        name="expiry_date"
                        value={detail.expiry_date}
                        onChange={(e) => handleDetailChange(index, e)}
                        required
                        className="min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                      />
                      <label className="mx-2 text-m/6 text-gray-900">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        name="qty"
                        value={detail.qty}
                        onChange={(e) => handleDetailChange(index, e)}
                        required
                        className="min-w-0 w-16 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                      />
                      <button
                        className="ml-4 p-2 border rounded-md"
                        type="button"
                        onClick={() => removeDetailRow(index)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="text-sm rounded-full px-4 my-4 mr-4 p-2 flex items-center justify-end border "
                type="button"
                onClick={addDetailRow}
              >
                ➕ Add Detail
              </button>
            </ul>
            <div className="my-4 mr-4 flex items-center justify-end gap-x-4">
              <button
                className="rounded-md bg-indigo-600 px-3 py-2 text-s font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
}

export default StockEntryForm;
