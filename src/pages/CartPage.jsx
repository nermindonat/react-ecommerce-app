// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sepetiniz</h1>
      {cartItems.length === 0 && <p>Sepetiniz boş.</p>}
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold">{item.title}</p>
            <p>
              {item.quantity} x ${item.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Kaldır
          </button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <div className="mt-6">
          <p className="font-bold text-lg">Toplam: ${total.toFixed(2)}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
          >
            Ödemeye Git
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
