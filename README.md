# **Stock Management System**

Stock management application for tracking inventory movements, managing batch records, and ensuring real-time stock updates. This project is built with **Node.js**, **PostgreSQL**, and **React.js**, providing a seamless user experience for handling stock IN and OUT operations.

---

## **Features**

- **Stock Movement:**
  - Record and manage stock entries for IN and OUT operations.
  - Validate available stock for OUT operations to prevent discrepancies.
- **Batch Management:**
  - Automatic batch ID generation for IN operations.
  - Maintain expiry dates for individual batches.
- **Stock Ledger:**
  - Comprehensive tracking of stock movements with quantities, timestamps, and batch details.
- **Error Handling:**
  - Duplicate prevention for stock entries.
  - Notifications for insufficient stock during OUT operations.

---

## **Getting Started**

### **Requirements**

To run this project locally, ensure you have:

- **Node.js** (v22+)
- **PostgreSQL** (v12+)
- **npm** or **yarn** package manager
- A web browser (e.g., Chrome, Firefox)

---

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dhemoz/stock-management.git
   cd stock-management
   ```

2. **Install Dependencies**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Database Setup**
   - Create a PostgreSQL database named `stock_management`.
   - Import the schema:
     ```bash
     psql -U postgres -d stock_management -f backend/sql/schema.sql
     ```

4. **Environment Configuration**
   - In the `backend` folder, create a `.env` file with the following content:
     ```plaintext
     DB_USER=postgres
     DB_PASSWORD=yourpassword
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=stock_management
     ```

5. **Start the Application**
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Access the Application**
   - Open your browser and go to `http://localhost:3000`.

---

## **API Endpoints**

### **Backend API**

- **POST** `/api/stock-entries`: Add a new stock entry.
- **GET** `/api/stock-entries`: Fetch all stock entries.
- **GET** `/api/stock-ledgers`: Fetch the stock ledger.
- **GET** `/api/items`: Fetch all items.

---

## **Project Structure**

```
stock-management/
├── backend/
│   ├── src/
│   │   ├── models/            # Database interaction logic
│   │   ├── controllers/       # API logic
│   │   ├── routes/            # API routes
│   ├── sql/                   # SQL scripts for schema and seeds
│   ├── .env                   # Environment variables
│   └── package.json           # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js             # Main application file
│   └── package.json           # Frontend dependencies
├── README.md                  # Documentation
```

---

## **Usage**

### **Performing Stock IN and OUT**

1. Navigate to the stock entry form in the frontend.
2. Choose **Type** (IN/OUT).
3. Fill in the required fields:
   - **IN**: Provide item code, expiry date, and quantity.
   - **OUT**: Provide item code, batch ID, and quantity.
4. Click "Submit" to save the entry.

### **View Stock Entries**
- Use the built-in interface to view and analyze all stock movements.

---

## **Testing the Application**

1. **Frontend Tests**
   - Use the form to input stock data and validate responses.
   - Check UI behavior for invalid inputs.

2. **API Tests**
   - Use Postman or cURL to interact with backend endpoints.

---


## **License**

This project is licensed under the **MIT License**. See `LICENSE` for details.

