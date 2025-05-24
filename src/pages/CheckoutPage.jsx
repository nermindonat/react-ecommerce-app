import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const [secure, setSecure] = useState(false);
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Ödeme Seçenekleri</h2>
            <hr className="-mx-6 mb-4" />
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-orange-500 mr-2 text-lg">●</span>
                  <span className="text-orange-600 font-semibold">
                    Kart ile Öde
                  </span>
                </div>
                <div className="text-gray-700 mb-4">
                  Kart ile ödemeyi seçtiniz. <b>Banka veya Kredi Kartı</b>{" "}
                  kullanarak ödemenizi güvenle yapabilirsiniz.
                </div>
                <div className="font-semibold text-lg mb-2">Kart Bilgileri</div>
                <form>
                  <label className="block text-gray-700 mb-1">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="Kart Numarası"
                  />
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-1">
                        Son Kullanma Tarihi
                      </label>
                      <div className="flex gap-2">
                        <select className="w-1/2 rounded-md border border-gray-200 bg-gray-50 p-2 focus:outline-none">
                          <option>Ay</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i}>
                              {String(i + 1).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                        <select className="w-1/2 rounded-md border border-gray-200 bg-gray-50 p-2 focus:outline-none">
                          <option>Yıl</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i}>{2024 + i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <label className="text-gray-700 mb-1 flex items-center">
                        CVV
                        <FaInfoCircle className="ml-1 text-orange-400" />
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 focus:outline-none"
                        placeholder="CVV"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="secure"
                      checked={secure}
                      onChange={() => setSecure(!secure)}
                      className="mr-2 accent-orange-500"
                    />
                    <label
                      htmlFor="secure"
                      className="font-semibold text-gray-700 select-none"
                    >
                      <span className="text-gray-900">3D Secure</span> ile
                      ödemek istiyorum
                    </label>
                  </div>
                </form>
              </div>
              <div className="flex-1 border-l border-gray-200 pl-8">
                <div className="font-semibold text-lg mb-2">
                  Taksit Seçenekleri
                </div>
                <div className="text-gray-700 mb-4">
                  Kartınıza uygun taksit seçeneğini seçiniz
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex bg-gray-50 font-semibold text-gray-700">
                    <div className="flex-1 px-4 py-2 border-r">
                      Taksit Sayısı
                    </div>
                    <div className="flex-1 px-4 py-2">Aylık Ödeme</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 px-4 py-2 flex items-center">
                      <span className="text-orange-500 mr-2">●</span>
                      Tek Çekim
                    </div>
                    <div className="flex-1 px-4 py-2 text-orange-600 font-semibold">
                      {total.toLocaleString()} TL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[35%] lg:max-w-sm">
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
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition">
              Ödeme Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
