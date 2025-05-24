import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function ProductDetailPage() {
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const product = products.find((p) => p.id === Number(id));

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  if (!product) return <div>Ürün bulunamadı.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start justify-center py-12 min-h-[80vh] max-w-[1100px] mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center min-w-[320px] min-h-[350px]">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[350px] max-w-[260px] object-contain"
        />
      </div>
      <div className="flex-1 max-w-[600px] w-full px-4 md:px-0">
        <div className="flex flex-col items-start gap-2">
          <div className="text-gray-500 text-sm my-2 font-roboto">
            <span className="text-gray-700 font-medium">Kategori:</span>{" "}
            {product.category}
          </div>

          <h2 className="font-bold text-xl font-roboto">{product.title}</h2>

          <div className="flex items-center gap-1 mb-5">
            <span className="text-gray-500 text-sm ml-2">
              {product.rating.rate}
            </span>
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
              {product.rating.count} Değerlendirme
            </span>
          </div>
        </div>
        <p className="text-gray-700 mt-0 mb-6 text-sm font-roboto">
          {product.description}
        </p>
        <div className="font-bold text-lg font-roboto">
          Fiyat: {product.price} TL
        </div>
        <div className="flex items-center gap-4 mt-8 border-t border-gray-200 pt-5">
          <button
            onClick={handleAddToCart}
            className={`flex ml-auto font-semibold border-0 py-2 px-6 rounded transition-colors focus:outline-none ${
              added
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {added ? "Sepete Eklendi" : "Sepete Ekle"}
          </button>
          <button className="bg-white border-[1.5px] border-gray-500 rounded-full w-[38px] h-[38px] flex items-center justify-center text-gray-500 text-xl  transition-colors">
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
