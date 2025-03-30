import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100;

  const checkout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/create-checkout-session",
        { 
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price, 
            quantity: item.quantity
          })) 
        },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your cart is empty. Add some products! 🛍️</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-md flex justify-between items-center mb-4 bg-white"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600">${(item.price / 100).toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  ➖
                </button>
                <span className="px-4 text-lg">{item.quantity}</span>
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  ➕
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 ml-4 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Total: <span className="text-green-600">${totalAmount.toFixed(2)}</span></h2>
          </div>

          {/* Checkout Button */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 mt-6 w-full rounded-lg text-lg font-semibold shadow-md"
            onClick={checkout}
          >
            ✅ Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
