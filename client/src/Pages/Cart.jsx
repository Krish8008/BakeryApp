import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, updateQty, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="max-w-2xl w-full p-6 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold text-pink-600">Your cart is empty</h2>
          <p className="mt-3 text-sm text-gray-600">Looks like you haven't added any cakes yet.</p>
          <div className="mt-6">
            <Link to="/cakes" className="inline-block bg-pink-600 text-white px-4 py-2 rounded-lg">Browse Cakes</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-pink-600">Your Cart</h2>

        <div className="mt-6 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border rounded-xl p-3">
              <img src={item.image || "/no-image.png"} alt={item.name} className="h-20 w-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="w-20 rounded-md border px-2 py-1"
                  />
                  <button onClick={() => removeItem(item.id)} className="text-red-600 text-sm">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <button onClick={() => { clearCart(); }} className="text-sm text-red-500">Clear Cart</button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-pink-600">₹{total}</p>
            <div className="mt-3">
              <button onClick={() => navigate('/cake/checkout')} className="bg-pink-600 text-white px-4 py-2 rounded-lg">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
