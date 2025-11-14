import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  userName: { type: String, required: true }, // ✅ Add user name
  products: [
    {
      productId: { type: String },
      productName: String,
      price: Number,
      qty: Number,
    }
  ],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("CartCollection", cartSchema);
