/*
  Component: Cartpanel
  Description:
    Renders a right-side sliding cart panel that displays items added to the cart,
    allows users to modify quantities, remove items, and proceed with checkout.
    Integrates with Firebase Authentication to bind cart actions to the logged-in user.

  Props:
    isOpen (boolean)
      - Controls whether the cart panel is visible (true) or hidden (false).

    onClose (function)
      - Callback used to close the cart panel from the parent component.

    cart (array)
      - Array of cart item objects received from the parent.
      - Each item typically contains:
            productId / id      → Unique identifier
            productName / name  → Product title
            price               → Product price
            qty                 → Selected quantity

    setCart (function)
      - Updates the cart state in the parent component.
      - Called after quantity changes, item removal, checkout, or backend sync.

    removeFromCart (function)
      - Callback passed for possible external removal logic.
      - Kept for compatibility even though internal removal uses removeProduct().
*/

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Cartpanel({
  isOpen,
  onClose,
  cart = [],
  setCart = () => {},
  removeFromCart = () => {},
}) {
  const [user, setUser] = useState(null);

  /*
    Effect: Track Firebase login state
    - Detects the currently authenticated user.
    - Updates `user` state whenever login/logout occurs.
    - Unsubscribes the listener when component unmounts.
  */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  /*
    Function: updateCartQty
    Purpose:
      Updates the quantity of a specific product in the backend cart database.

    Parameters:
      productId (string)
        - Identifier of the product being updated.

      qty (number)
        - New quantity to be applied.

    Behavior:
      - Sends a PUT request to backend.
      - If successful, updates the frontend cart using setCart().
      - Skips operation if no user is logged in.
  */
  const updateCartQty = async (productId, qty) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${user.uid}/item`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty }),
      });

      console.log("Response status for updating:", res.status);

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to update cart:", data.error);
        return;
      }

      setCart(data.products);
    } catch (err) {
      console.error("Error updating product quantity:", err);
    }
  };

  /*
    Function: increaseQty
    Purpose:
      Increases the quantity of an item by 1 and syncs with backend.

    Parameters:
      id (string) - Product ID.
      currentQty (number) - Existing quantity.
  */
  const increaseQty = (id, currentQty) => {
    const newQty = currentQty + 1;
    updateCartQty(id, newQty);
  };

  /*
    Function: decreaseQty
    Purpose:
      Decreases the quantity of an item by 1 (minimum 1) and syncs with backend.

    Parameters:
      id (string) - Product ID.
      currentQty (number) - Existing quantity.
  */
  const decreaseQty = (id, currentQty) => {
    if (currentQty <= 1) return;
    const newQty = currentQty - 1;
    updateCartQty(id, newQty);
  };

  /*
    Function: removeProduct
    Purpose:
      Removes a product entirely from the user's cart.

    Parameters:
      productId (string)
        - ID of the product to remove.

    Behavior:
      - Sends a DELETE request to backend.
      - Removes the item from frontend cart using setCart().
  */
  const removeProduct = async (productId) => {
    if (!user) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/cart/${user.uid}/item/${productId}`,
        { method: "DELETE" }
      );

      console.log("Response status for deleting:", res.status);

      setCart((prev) =>
        prev.filter(
          (item) => item.productId !== productId && item.id !== productId
        )
      );
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  /*
    Function: handleCheckout
    Purpose:
      Finalizes the user's order, sends it to the backend,
      clears the cart, and opens WhatsApp with order details.

    Behavior:
      - Validates login and cart contents.
      - Prepares order data (product list + price).
      - Saves order in backend.
      - Clears cart in backend and frontend.
      - Opens WhatsApp with a formatted order summary message.
  */
  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in before checking out!");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const products = cart.map((item) => ({
      productId: item.productId || item.id,
      productName: item.productName || item.name,
      price: Number(item.price),
      qty: item.qty || 1,
    }));

    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const orderData = {
      userId: user.uid,
      userName: user.displayName || user.email || "Guest",
      products,
      totalAmount,
    };

    try {
      const res = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save order");
        return;
      }

      console.log("Order saved:", data);

      await fetch(`http://localhost:5000/api/CartCollection/${user.uid}`, {
        method: "DELETE",
      });

      setCart([]);

      const orderDetails = products
        .map((p) => `${p.productName} (x${p.qty}) - ₹${p.price * p.qty}`)
        .join("\n");

      const message = `🕯️ CandleX Order 🕯️
      Hi, I'm ${orderData.userName}.
      Order details:      
      ${orderDetails}
      Total: ₹${orderData.totalAmount}
    Please confirm my order.`;

      const phoneNumber = "919500669628";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      alert("Order placed! Redirecting to WhatsApp...");
      window.open(whatsappURL, "_blank");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong while placing the order");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full rounded-tl-xl my-2 bg-[#f1cc94bb] shadow-amber-300 border-3 border-white transition-transform duration-300 z-80 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="p-2 px-6 mx-24 m-2 bg-amber-500 rounded-xl text-white font-bold hover:bg-amber-600 transition"
      >
        Close
      </button>

      <div className="p-4">
        {cart.length === 0 && (
          <p className="font-mono text-center">Oops, your cart looks empty</p>
        )}

        {(() => {
          /*
            Internal Logic: Merge duplicates
            - Some items may appear twice (from DB or UI).
            - Mapped by productId/id.
            - Quantities are combined into a single item entry.
          */
          const mergedCartMap = new Map();
          cart.forEach((item) => {
            const id = item.productId || item.id;
            if (mergedCartMap.has(id)) {
              mergedCartMap.get(id).qty += item.qty || 1;
            } else {
              mergedCartMap.set(id, { ...item, qty: item.qty || 1 });
            }
          });

          const mergedCart = Array.from(mergedCartMap.values());

          return mergedCart.map((item) => (
            <div
              key={item.productId || item.id}
              className="flex justify-between items-center my-3 border-b border-amber-300 pb-2"
            >
              <span className="font-mono">{item.productName || item.name}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    decreaseQty(item.productId || item.id, item.qty)
                  }
                  className="px-2 bg-amber-400 rounded-lg hover:bg-amber-500 text-white"
                >
                  -
                </button>

                <span className="font-mono text-lg">{item.qty}</span>

                <button
                  onClick={() =>
                    increaseQty(item.productId || item.id, item.qty)
                  }
                  className="px-2 bg-amber-400 rounded-lg hover:bg-amber-500 text-white"
                >
                  +
                </button>

                <button
                  onClick={() => removeProduct(item.productId || item.id)}
                  className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ));
        })()}

        {cart.length > 0 && (
          <div className="mt-6">
            <p className="font-bold text-center mb-4">
              Total: ₹
              {cart.reduce(
                (sum, item) => sum + item.qty * (item.price || 0),
                0
              )}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white font-bold py-2 rounded-xl hover:bg-green-600 transition"
            >
              Buy Now (Send to Admin)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
