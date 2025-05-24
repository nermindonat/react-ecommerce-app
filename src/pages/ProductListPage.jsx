import { useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";

const ProductsPage = () => {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  const handleClick = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    navigate(`/products/${id}`, { state: { product: data } });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handlePriceApply = ({ min, max }) => {
    setPriceFilter({ min: Number(min), max: Number(max) });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      let ok = true;
      // Kategori filtresi
      if (selectedCategory) {
        ok = ok && p.category === selectedCategory;
      }
      // Fiyat filtresi
      if (priceFilter.min !== "" && priceFilter.max !== "") {
        ok = ok && p.price >= priceFilter.min && p.price <= priceFilter.max;
      }

      return ok;
    });
  }, [products, selectedCategory, priceFilter]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-72 flex-shrink-0 mb-6 md:mb-0">
          <FilterSidebar
            onCategoryChange={handleCategoryChange}
            onPriceApply={handlePriceApply}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleClick(product.id)}
                className="bg-white rounded-[18px] shadow-[0_2px_12px_0_rgba(60,72,88,0.10)] p-5 w-[220px] flex flex-col items-center cursor-pointer transition duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_8px_24px_0_rgba(60,72,88,0.18)]"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[120px] object-contain mb-4 max-w-full"
                />
                <h4 className="font-semibold text-base mb-2 text-center min-h-[48px]">
                  {product.title.slice(0, 40)}...
                </h4>
                <div className="flex items-center gap-[0.3rem] mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-[1.1rem] ${
                        i < Math.round(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-500 text-sm ml-2">
                    {product.rating.rate}
                  </span>
                </div>
                <p className="font-bold text-[#2d2d2d] text-[1.15rem] m-0">
                  {product.price} TL
                </p>
              </div>
            ))}
            {/* Filtre sonrası hiç ürün yoksa mesaj ver */}
            {filteredProducts.length === 0 && (
              <p className="text-gray-500">
                Bu kriterlere uygun ürün bulunamadı.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
