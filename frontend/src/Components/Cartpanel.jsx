import { getAuth } from "firebase/auth";
import { Trash2 } from "lucide-react"; // 🗑️ icon

export default function Cartpanel({
  isOpen,
  onClose,
  cart = [],
  setCart = () => {}, // ✅ so we can update qty
  removeFromCart = () => {},
}) {
  const adminNumber = "919500669628";

  // Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // Handle Buy Now → WhatsApp + Backend
  const handleBuyNow = async () => {
    if (cart.length === 0) return;

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userName = currentUser?.displayName || currentUser?.email || "Guest";

    const total = cart.reduce(
      (sum, item) => sum + item.qty * (item.price || 0),
      0
    );
    const message = cart.map((item) => `${item.name} x ${item.qty}`).join("\n");
    const finalMessage = `🛒 New Order by ${userName}:\n${message}\n\nTotal: ₹${total}`;
    const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(waUrl, "_blank");

    // Send to backend
    const cartData = {
      userName,
      cartItems: cart.map((item) => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
    };

    try {
      const res = await fetch(
        "https://candlex-io.onrender.com/api/orders/cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartData),
        }
      );
      const data = await res.json();
      console.log("Cart orders saved:", data);
      alert("Order placed successfully!");
      setCart([]); // ✅ Clear cart
    } catch (err) {
      console.error("Error saving cart orders:", err);
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

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center my-3 border-b border-amber-300 pb-2"
          >
            <span className="font-mono">{item.name}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 bg-amber-400 rounded-lg hover:bg-amber-500 text-white"
              >
                −
              </button>

              <span className="font-mono text-lg">{item.qty}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 bg-amber-400 rounded-lg hover:bg-amber-500 text-white"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

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
              onClick={handleBuyNow}
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
