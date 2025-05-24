import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";

function HomePage() {
  const { products } = useProducts();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const topFiveProducts = products.slice(0, 6);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Kategori verisi alınamadı:", err));
  }, []);

  const handleClick = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    navigate(`/products/${id}`, { state: { product: data } });
  };

  return (
    <div className="p-4 min-h-screen">
      <div className=" max-w-[1500px] mx-auto flex flex-col  md:flex-row gap-4 mb-4py-8 px-4">
        <div className="flex-1 bg-green-50 rounded-xl flex items-center justify-center py-6">
          <span className="text-green-800 font-bold text-xl text-center">
            Sepete en çok eklenenler
          </span>
        </div>
        <div className="flex-1 bg-orange-50 rounded-xl flex items-center justify-center py-6">
          <span className="text-orange-700 font-bold text-xl text-center">
            En çok öne çıkanlar
          </span>
        </div>
        <div className="flex-1 bg-pink-50 rounded-xl flex items-center justify-center py-6">
          <span className="text-pink-700 font-bold text-xl text-center">
            Flaş Ürünler
          </span>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto py-8 px-4">
        <h1 className="font-bold text-2xl mb-8 text-center md:text-left">
          Popüler Ürünler
        </h1>
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {topFiveProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product.id)}
              className="bg-white rounded-[18px] shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] transition duration-200 p-5 w-[220px] h-[280px] flex flex-col items-center cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-[120px] object-contain mb-4 max-w-full"
              />
              <h4 className="font-semibold text-base text-center mb-2 min-h-[48px]">
                {product.title.slice(0, 40)}...
              </h4>
              <div className="flex items-center gap-1 mb-2">
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
        </div>
      </div>
      <div className="text-right mr-16 flex items-center justify-end ">
        <button
          onClick={() => navigate("/products")}
          className="text-black  font-semibold text-base flex items-center justify-center"
        >
          Tümünü Gör
          <GrNext className="ml-2 text-black " />
        </button>
      </div>
      <div className="max-w-[1500px] mx-auto py-6 px-4">
        <h2 className="font-bold text-2xl mb-6">Kategoriler</h2>
        <div className="flex flex-wrap gap-6 ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] bg-gray-100 rounded-full flex items-center justify-center text-center p-4 shadow hover:shadow-md hover:bg-gray-200 transition cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700 leading-tight">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
