import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    fetch(`${API_URL}/api/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto p-6 bg-gray-800 rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Item List
        </h2>
        {items.length === 0 ? (
          <p className="text-gray-600">No items available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <ul className="border-b">
                <li
                  className="flex justify-between items-center border-b border-gray-800 p-4 last:border-none"
                >
                  
                  <div className="text-gray-800 font-semibold py-1 px-6">
                    Item Code
                  </div>

                  
                  <div className="flex-1 px-6">
                    <p className="text-gray-800 font-medium">Item Name</p>
                  </div>

                  
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-800 font-semibold py-1 px-6">
                      Unit Of Measurement
                    </div>
                  </div>
                  
                </li>
            </ul>
            <ul>
              {items.map((item) => (

                <li
                  key={item.item_code}
                  className="flex justify-between items-center border-b border-gray-200 p-4 last:border-none"
                >
                  
                  <div className="bg-gray-100 text-gray-800 font-semibold py-1 px-6 rounded">
                    {item.item_code}
                  </div>

                  
                  <div className="flex-1 px-6">
                    <p className="text-gray-800 font-medium">{item.name}</p>
                  </div>

                  
                  <div className="flex items-center space-x-2 mr-6">
                    <div className="bg-indigo-600  text-white font-semibold py-1 px-6 rounded">
                      {item.uom}
                    </div>
                  </div>
                  
                </li>

              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemList;
