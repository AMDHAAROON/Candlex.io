import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/candlexDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// Schema
const orderSchema = new mongoose.Schema({
  userName: String,
  productName: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ✅ Save single product (Buy Now)
app.post("/api/order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Save multiple products (Cart checkout)
app.post("/api/orders/cart", async (req, res) => {
  try {
    const { cartItems, userName } = req.body;
    if (!cartItems || !cartItems.length) return res.status(400).json({ error: "Cart is empty" });

    const ordersToSave = cartItems.map(item => ({
      userName,
      productName: item.name,
      price: item.price,
      quantity: item.qty,
    }));

    const savedOrders = await Order.insertMany(ordersToSave);
    res.json({ message: "Cart orders saved successfully!", savedOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
