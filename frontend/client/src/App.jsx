import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Dashboard from "./pages/Dashboard";
import { CartProvider, useCart } from "./context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-4 bg-gray-900 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">
        E-Commerce
      </Link>
      <Link to="/cart" className="text-lg">
        🛒 Cart{" "}
        {cartCount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Failure />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
