// Cartpanel.jsx
// ✅ A slide-in panel to display the user's shopping cart
// Props:
// - isOpen: boolean to control visibility (true = open, false = closed)
// - onClose: function to close the panel
// - cart: array of cart items (default empty array)
// - removeFromCart: function to remove an item from the cart (default no-op)

export default function Cartpanel({
  isOpen,
  onClose,
  cart = [],
  removeFromCart = () => {},
}) {
  return (
    // Panel container: fixed to top-right, full height, width 80, with slide-in animation
    <div
      className={`fixed top-0 right-0 w-80 h-full  rounded-tl-xl my-2  bg-[#f1cc94bb] shadow-amber-300 border-3 border-white transition-transform duration-300 z-80 ${
        isOpen ? "translate-x-0" : "translate-x-full" // Slide in/out based on isOpen
      }`}
    >
      {/* Close button */}
      <button
        onClick={onClose} // Calls the onClose prop to hide the panel
        className="p-2 px-6 mx-24 m-2  bg-amber-500 rounded-xl text-white font-bold  hover:bg-amber-600 transition"
      >
        Close
      </button>

      {/* Cart items container */}
      <div className="p-4">
        {/* Show message if cart is empty */}
        {cart.length === 0 && <p className="font-mono text-center">Oops, your cart looks empty</p>}

        {/* Render each cart item */}
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between my-2">
            {/* Item name and quantity */}
            <span className="font-mono pt-2  ">
              {item.name} x {item.qty}
            </span>

            {/* Remove item button */}
            <button
              onClick={() => removeFromCart(item.id)} // Calls removeFromCart with the item's id
              className=" font-mono bg-amber-500 rounded-xl p-1.5 text-white hover:bg-amber-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
