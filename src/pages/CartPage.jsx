import { FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 p-6 max-w-screen-xl w-full">
        <div className="w-full md:w-[65%]">
          {totalQuantity > 0 && (
            <h2 className="text-2xl font-semibold mb-6">
              Sepetim ({totalQuantity} Ürün)
            </h2>
          )}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain rounded-lg bg-gray-50"
              />
              <div className="flex-1 ml-6">
                <div className="font-semibold text-sm md:text-lg">
                  {item.title}
                </div>
                <div className="text-orange-600 font-bold text-base mt-1">
                  Fiyat: {item.price} TL
                </div>
                <div className="w-full mt-3 flex justify-start lg:w-auto lg:mt-0 lg:flex lg:items-center lg:gap-2 lg:mx-4 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 rounded bg-gray-100 text-gray-500 text-xl font-bold hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 rounded bg-gray-100 text-gray-500 text-xl font-bold hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center text-gray-500 hover:text-red-600 ml-2"
                  >
                    <FaTrash className="mr-1" />
                    <span className="text-sm">Sil</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-[35%] md:max-w-sm">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Ürünün Toplamı:</span>
              <span className="font-semibold">{total.toLocaleString()} TL</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Kargo Toplam:</span>
              <span className="font-semibold">Ücretsiz</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between mb-4 text-lg">
              <span className="font-semibold">Toplam:</span>
              <span className="font-bold text-orange-600 text-lg">
                {total.toLocaleString()} TL
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
            >
              Sepeti Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
