import { auth } from "../Utility/firebase/firebase";


// Cartpanel.jsx
export default function Cartpanel({
  isOpen,
  onClose,
  cart = [],
  removeFromCart = () => {},
  user = null, // ✅ pass logged-in user as prop
}) {
  const adminNumber = "919500669628"; // WhatsApp number

  // Save order to backend
  const saveOrderToBackend = async (orders) => {
    try {
      const res = await fetch("http://localhost:4000/saveOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });
      const data = await res.json();
      console.log("Orders saved to backend:", data);
    } catch (err) {
      console.error("Error saving orders:", err);
    }
  };

  // Handle Buy Now → WhatsApp + Backend
  const handleBuyNow = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.qty * (item.price || 0), 0);

    // ✅ Get logged-in user
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;


    // WhatsApp message
    const message = cart.map((item) => `${item.name} x ${item.qty}`).join("\n");
    const finalMessage = `🛒 New Order by ${user?.name || "Guest"}:\n${message}\n\nTotal: ₹${total}`;
    const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(waUrl, "_blank");

    // Prepare orders for backend
    const customer_name = user?.name || "Guest"; // ✅ use logged-in user name
    const orders = cart.map((item) => ({
      customer_name,
      product_name: item.name,
      quantity: item.qty,
      total_price: item.price * item.qty,
    }));

    saveOrderToBackend(orders);

    // Optional: clear cart after purchase
    cart.length = 0;
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
          <div key={item.id} className="flex justify-between my-2">
            <span className="font-mono pt-2">{item.name} x {item.qty}</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="font-mono bg-amber-500 rounded-xl p-1.5 text-white hover:bg-amber-600 transition"
            >
              Remove
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="mt-6">
            <p className="font-bold text-center mb-4">
              Total: ₹{cart.reduce((sum, item) => sum + item.qty * (item.price || 0), 0)}
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
