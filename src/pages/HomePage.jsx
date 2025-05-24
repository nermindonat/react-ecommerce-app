import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function HomePage() {
  const { products } = useProducts(); // context'ten alındı
  const navigate = useNavigate();

  const topFiveProducts = products.slice(0, 6); // sadece ilk 5 ürün

  // Tıklama handler’ı
  const handleClick = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    navigate(`/products/${id}`, { state: { product: data } });
  };

  return (
    <div className="p-4 bg-[#f5f6fa] min-h-screen">
      <div className="max-w-[1500px] mx-auto py-8 px-4">
        <h1 className="font-bold text-2xl mb-8">Popüler Ürünler</h1>
        <div className="flex flex-wrap gap-6 justify-start">
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
    </div>
  );
}

export default HomePage;
