import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        {/* Dashboard Icon */}
        <Link
          to="/dashboard"
          className="flex items-center bg-gray-900 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700"
        >
          <span className="material-icons mr-2">dashboard</span>
          Dashboard
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow-md">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-700">${product.price / 100}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
