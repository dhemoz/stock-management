import React, { useState } from "react";
import { API_URL } from "../api";

function ItemForm() {
  const [itemCode, setItemCode] = useState("");
  const [name, setName] = useState("");
  const [uom, setUom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { item_code: itemCode, name, uom };

    fetch(`${API_URL}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Item added successfully!");
        setItemCode("");
        setName("");
        setUom("");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add item");
      });
  };

  return (
    <div className="container mx-auto p-6 pb-10 bg-gray-800 rounded-md">
      <div>
        <div className="pb-2">
          <h2 className="text-xl font-semibold text-white">Add New Item</h2>
          <p className="mt-1 text-sm/6 text-gray-300">
            The information entered here will be used across stock management
            processes. Ensure all fields are correctly filled out.
          </p>
        </div>
        <div div className="bg-white rounded-lg shadow-md p-2">
          <ul className="pl-2">
            <form onSubmit={handleSubmit}>
              <li className="py-1 mt-1">
                <div className="sm:col-span-4">
                  <label
                    className="block text-m/6 font-medium text-gray-900"
                  >
                    Item Code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={itemCode}
                      placeholder="010105001"
                      onChange={(e) => setItemCode(e.target.value)}
                      required
                      className="block min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </li>
              <li className="py-1 mt-1">
                <div className="sm:col-span-4">
                  <label
                    className="block text-m/6 font-medium text-gray-900"
                  >
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={name}
                      placeholder="Screwdriver"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="block min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </li>
              <li className="py-1 mt-2">
                <div className="sm:col-span-4">
                  <label
                    className="block text-m/6 font-medium text-gray-900"
                  >
                    Unit Of Measurement
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={uom}
                      placeholder="EACH"
                      onChange={(e) => setUom(e.target.value)}
                      required
                      className="block min-w-0 grow py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 border rounded-md focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </li>
              <div className="border-b , pt-10"></div>
              <div className="my-4 mr-4 flex items-center justify-end gap-x-4">
                <button
                  type="button"
                  className="text-s/6 font-semibold text-gray-900"
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-indigo-600 px-3 py-2 text-s font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  Add Item
                </button>
              </div>
            </form>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
