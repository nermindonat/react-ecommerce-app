import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-100 py-2 px-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logo} alt="" className="w-10 h-10 mr-1 rounded" />
          <h2 className="text-xl">
            <span className="font-bold">N</span>&
            <span className="font-bold">D</span>
          </h2>
        </a>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Ürün, kategori, marka ara"
              className="w-full rounded-full pl-6 pr-10 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500" />
          </div>
        </div>
        <div className="flex items-center gap-6 ml-4">
          <div className="flex items-center gap-1 text-gray-700">
            <FaUser className="text-lg" />
            <a href="#" className="ml-1 underline text-sm hover:text-blue-700">
              Giriş Yap
            </a>
            <span className="mx-1 text-sm">|</span>
            <a href="#" className="underline text-sm hover:text-blue-700">
              Üye Ol
            </a>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500"
          >
            <FaHeart className="text-lg" />
            <span className="text-sm">Favorilerim</span>
          </a>
          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500"
          >
            <FaShoppingCart className="text-lg" />
            <span className="text-sm">Sepetim</span>
            {totalQuantity > 0 && (
              <div className="bg-[#f27a1a] text-white text-[11px] w-4 h-4 leading-[16px] text-center  rounded-full z-10">
                {totalQuantity}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
