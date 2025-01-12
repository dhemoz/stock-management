const { Client } = require('pg');


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'stock_management',
  password: '123456',
  port: 5432, 
});

client.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Connection error', err.stack));
