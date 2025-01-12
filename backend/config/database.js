const { Client } = require('pg');

// Pastikan konfigurasi ini sesuai dengan setup database Anda
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'stock_management',
  password: '123456',
  port: 5432, // atau port lain yang digunakan
});

client.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Connection error', err.stack));
