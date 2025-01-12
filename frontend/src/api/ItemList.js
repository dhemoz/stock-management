import React, { useEffect, useState } from 'react';
import { API_URL } from '../api';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.item_code}>
            {item.item_code} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
