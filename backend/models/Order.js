import mongoose from "mongoose";

// order.js schema
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true }, // ✅ string
      productName: String,
      price: Number,
      qty: Number,
    }
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});


export default mongoose.model("Order", orderSchema);
