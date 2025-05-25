import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function Header() {
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Arama inputuna yazılan query ye göre filtreleme
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const query = search.trim();
      if (query) {
        navigate(`/products?search=${encodeURIComponent(query)}`);
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="bg-blue-100 py-2 px-4 relative">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logo} alt="" className="w-10 h-10 mr-1 rounded" />
          <h2 className="text-xl">
            <span className="font-bold">N</span>&
            <span className="font-bold">D</span>
          </h2>
        </a>
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars className="text-xl text-gray-700" />
        </button>
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Ürün, kategori ara"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full rounded-full pl-6 pr-10 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700"
            />
            <FaSearch
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 
            hover:text-orange-600 hover:scale-110 transition-all duration-200 
            cursor-pointer"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 ml-4">
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
              <div className="bg-[#f27a1a] text-white text-[11px] w-4 h-4 leading-[16px] text-center rounded-full z-10">
                {totalQuantity}
              </div>
            )}
          </Link>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed top-[56px] left-0 w-full bg-white shadow-lg z-50 p-6 flex flex-col items-center text-center gap-6 animate-fadeIn">
            <div className="relative w-full max-w-xs mb-4">
              <input
                type="text"
                placeholder="Ürün, kategori ara"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full rounded-full pl-6 pr-10 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700"
              />
              <FaSearch
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
              />
            </div>
            <div className="flex flex-col gap-6 w-full max-w-xs">
              <div className="flex items-center gap-2 text-gray-700 justify-center">
                <FaUser className="text-lg" />
                <div className="flex gap-2">
                  <a href="#" className="underline text-sm hover:text-blue-700">
                    Giriş Yap
                  </a>
                  <span className="text-sm">|</span>
                  <a href="#" className="underline text-sm hover:text-blue-700">
                    Üye Ol
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 justify-center"
              >
                <FaHeart className="text-lg" />
                <span className="text-sm">Favorilerim</span>
              </a>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 justify-center"
              >
                <FaShoppingCart className="text-lg" />
                <span className="text-sm">Sepetim</span>
                {totalQuantity > 0 && (
                  <div className="bg-[#f27a1a] text-white text-[11px] w-4 h-4 leading-[16px] text-center rounded-full z-10">
                    {totalQuantity}
                  </div>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
