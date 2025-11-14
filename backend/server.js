import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/*
--------------------------------------------------------------------
  MongoDB Connection
  - Establishes connection using MONGO_URI from environment variables.
  - Logs connection success or error message.
--------------------------------------------------------------------
*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

/*
--------------------------------------------------------------------
  Mongoose Schemas
  - cartSchema: Stores each user's shopping cart items.
    Fields:
      - userId: Firebase UID
      - products: Array of product items with id, name, price, qty

  - orderSchema: Stores completed orders.
    Fields:
      - userId: Firebase UID
      - userName: Customer name/email
      - products: Items purchased
      - totalAmount: Total bill at checkout
      - orderDate: Timestamp
--------------------------------------------------------------------
*/
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: String,
      productName: String,
      price: Number,
      qty: { type: Number, default: 1 },
    },
  ],
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  products: [
    {
      productId: String,
      productName: String,
      price: Number,
      qty: Number,
    },
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});

const CartCollection = mongoose.model("CartCollection", cartSchema);
const Order = mongoose.model("Order", orderSchema);

/*
--------------------------------------------------------------------
  API ENDPOINTS
--------------------------------------------------------------------
*/

/*
--------------------------------------------------------------------
  GET /api/CartCollection/:userId
  Purpose:
    - Retrieve a user's cart using Firebase UID.
    - If the cart does not exist, creates a new empty cart.

  Params:
    - userId (string): Firebase user UID.

  Returns:
    - Existing cart OR newly created empty cart.
--------------------------------------------------------------------
*/
app.get("/api/CartCollection/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await CartCollection.findOne({ userId });

    if (!cart) {
      cart = new CartCollection({ userId, products: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
--------------------------------------------------------------------
  PUT /api/CartCollection/:userId
  Purpose:
    - Handles "Add to Cart" button action to put every product into the cart collection.


  Params:
    - userId (string): Firebase UID.

  Body:
    - productId (string)
    - productName (string)
    - price (number)
    - qty (number)

  Returns:
    - Updated cart document.
--------------------------------------------------------------------
*/
app.put("/api/CartCollection/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, productName, price, qty } = req.body;

    let cart = await CartCollection.findOne({ userId });

    if (!cart) {
      cart = new CartCollection({
        userId,
        products: [{ productId, productName, price, qty }],
      });
    } else {
      const existingIndex = cart.products.findIndex(p => p.productId === productId);

      if (existingIndex !== -1) {
        cart.products[existingIndex].qty += qty;
      } else {
        cart.products.push({ productId, productName, price, qty });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
--------------------------------------------------------------------
  DELETE /api/CartCollection/:userId
  Purpose:
    - Clears entire cart after checkout.
    - Deletes user's cart document completely.

  Params:
    - userId (string)

  Returns:
    - Success message.
--------------------------------------------------------------------
*/
app.delete("/api/CartCollection/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartCollection.findOneAndDelete({ userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
--------------------------------------------------------------------
  POST /api/order
  Purpose:
    - Handles checkout for both:
        • Cart "Buy Now"
        • Product card "Buy Now"
    - Saves order to database.

  Body:
    - userId (string)
    - userName (string)
    - products (array)
    - Each product includes productId, productName, price, qty

  Returns:
    - Order details.
--------------------------------------------------------------------
*/
app.post("/api/order", async (req, res) => {
  try {
    const { userId, userName, products } = req.body;

    const totalAmount = products.reduce(
      (sum, p) => sum + (Number(p.price) || 0) * (Number(p.qty) || 1),
      0
    );

    const order = new Order({
      userId,
      userName,
      products,
      totalAmount,
    });

    console.log("this is from both single and multi prod");
    await order.save();

    res.json({ message: "Order placed successfully single", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
--------------------------------------------------------------------
  PUT /api/cart/:uid/item
  Purpose:
    - Updates product quantity inside cart panel.

  Params:
    - uid (string): Firebase UID.

  Body:
    - productId (string)
    - qty (number)

  Returns:
    - Updated cart product list.
--------------------------------------------------------------------
*/
app.put("/api/cart/:uid/item", async (req, res) => {
  const { uid } = req.params;
  const { productId, qty } = req.body;

  if (!productId || typeof qty !== "number") {
    return res.status(400).json({ error: "Product ID and qty are required" });
  }

  try {
    const userCart = await CartCollection.findOne({ userId: uid });
    if (!userCart) return res.status(404).json({ error: "Cart not found" });

    const productIndex = userCart.products.findIndex(p => p.productId === productId);
    if (productIndex === -1) return res.status(404).json({ error: "Product not in cart" });

    userCart.products[productIndex].qty = qty;
    await userCart.save();

    res.json({ success: true, products: userCart.products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
--------------------------------------------------------------------
  DELETE /api/cart/:uid/item/:productId
  Purpose:
    - Removes a single item from cart panel.

  Params:
    - uid (string): Firebase UID.
    - productId (string): ID of product to remove.

  Returns:
    - Updated cart without removed product.
--------------------------------------------------------------------
*/
app.delete("/api/cart/:uid/item/:productId", async (req, res) => {
  const { uid, productId } = req.params;

  try {
    const userCart = await CartCollection.findOne({ userId: uid });
    if (!userCart) return res.status(404).json({ error: "Cart not found" });

    userCart.products = userCart.products.filter(p => p.productId !== productId);
    await userCart.save();

    res.json({ success: true, products: userCart.products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
--------------------------------------------------------------------
  Server Listener
  - Starts Express server on port 5000.
--------------------------------------------------------------------
*/
app.listen(5000, () => console.log("Server running on port 5000"));
