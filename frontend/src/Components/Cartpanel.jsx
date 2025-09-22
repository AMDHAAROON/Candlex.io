// Cartpanel.jsx
export default function Cartpanel({
  isOpen,
  onClose,
  cart = [],
  removeFromCart = () => {},
}) {
  // ✅ Handle Buy Now → send details to admin on WhatsApp
  const handleBuyNow = () => {
    const adminNumber = "919500669628"; // replace with admin's WhatsApp number (without +)

    // Format items
    const message = cart
      .map((item) => `${item.name} x ${item.qty}`)
      .join("\n");

    // Calculate total (assuming each item has price field, otherwise remove)
    const total = cart.reduce(
      (sum, item) => sum + item.qty * (item.price || 0),
      0
    );

    // Final message
    const finalMessage = `🛒 New Order:\n${message}\n\nTotal: ₹${total}`;

    // Open WhatsApp
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      finalMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full rounded-tl-xl my-2 bg-[#f1cc94bb] shadow-amber-300 border-3 border-white transition-transform duration-300 z-80 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="p-2 px-6 mx-24 m-2 bg-amber-500 rounded-xl text-white font-bold hover:bg-amber-600 transition"
      >
        Close
      </button>

      {/* Cart items */}
      <div className="p-4">
        {cart.length === 0 && (
          <p className="font-mono text-center">
            Oops, your cart looks empty
          </p>
        )}

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between my-2">
            <span className="font-mono pt-2">
              {item.name} x {item.qty}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="font-mono bg-amber-500 rounded-xl p-1.5 text-white hover:bg-amber-600 transition"
            >
              Remove
            </button>
          </div>
        ))}

        {/* ✅ Total & Buy Now button */}
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
