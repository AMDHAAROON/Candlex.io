import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productName: String,
  quantity: Number,
  price: Number,
  orderDate: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
