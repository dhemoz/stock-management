import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import StockEntryList from "./components/StockEntryList";
import StockEntryForm from "./components/StockEntryForm";
import StockLedgerReport from "./components/StockLedgerReport";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white">
          <div className="p-4">
            <h2 className="text-lg font-bold">Stock Management</h2>
          </div>
          <nav>
            <ul className="space-y-2">
              {/* Item Menu */}
              <li>
                <h3 className="px-4 py-2 text-white bg-gray-800">Item</h3>
                <ul className="space-y-1 pl-4">
                  <li>
                    <Link
                      to="/items"
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-item"
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Form Input Item
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Stock Entry Menu */}
              <li>
                <h3 className="px-4 py-2 text-white bg-gray-800">Stock Entry</h3>
                <ul className="space-y-1 pl-4">
                  <li>
                    <Link
                      to="/stock-entry"
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-stock-entry"
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Form Input Stock Entry
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Stock Ledger Report */}
              <li>
                <Link
                  to="/stock-ledger"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  Report Stock Ledger
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-4">
          <Routes>
            {/* Item Routes */}
            <Route path="/items" element={<ItemList />} />
            <Route path="/add-item" element={<ItemForm />} />

            {/* Stock Entry Routes */}
            <Route path="/stock-entry" element={<StockEntryList />} />
            <Route path="/add-stock-entry" element={<StockEntryForm />} />

            {/* Stock Ledger Report */}
            <Route path="/stock-ledger" element={<StockLedgerReport />} />

            {/* Default Route */}
            <Route path="/" element={<ItemList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
