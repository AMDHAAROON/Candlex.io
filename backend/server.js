// backend/server.js
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Save order endpoint
app.post('/saveOrder', async (req, res) => {
  const { orders } = req.body; // orders array from frontend

  if (!orders || orders.length === 0) {
    return res.status(400).json({ error: 'No orders provided' });
  }

  try {
    const insertedOrders = [];

    // Loop through orders and insert them one by one
    for (const order of orders) {
      const { customer_name, product_name, quantity, total_price } = order;

      const result = await pool.query(
        'INSERT INTO orders (customer_name, product_name, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
        [customer_name, product_name, quantity, total_price]
      );

      const inserted = result.rows[0];
      insertedOrders.push(inserted);

      // ✅ Show the inserted order in terminal
      console.log('🧾 New Order Inserted:');
      console.table(inserted);
    }

    res.json({ success: true, insertedOrders });
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ✅ Start backend
app.listen(4000, () => console.log('✅ Backend running on http://localhost:4000'));
