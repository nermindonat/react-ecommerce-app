import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

export default function FilterSidebar({ onCategoryChange, onPriceApply }) {
  const [openSections, setOpenSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Manuel aralık uygula
  const handlePriceApply = () => {
    const min = Number(priceRange.min) || 0;
    const max = Number(priceRange.max) || Infinity;
    onPriceApply({ min, max });
  };

  // Preset aralıklardan seçildiğinde uygula
  const handlePreset = (range) => {
    const [min, max] = range
      .split(" - ")
      .map((s) => Number(s.replace(/[^0-9]/g, "")));
    onPriceApply({ min, max });
  };

  const presetRanges = [
    "0 TL - 225 TL",
    "225 TL - 350 TL",
    "350 TL - 500 TL",
    "500 TL - 700 TL",
    "700 TL - 900 TL",
    "900 TL - 700000 TL",
  ];

  return (
    <aside className="w-72 p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex justify-between items-center font-semibold text-gray-800"
        >
          Kategori
          {openSections.includes("category") ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}
        </button>
        {openSections.includes("category") && (
          <ul className="mt-2 pl-2 space-y-1">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  id={`cat-${cat}`}
                  className="form-radio h-4 w-4 text-orange-500"
                  onChange={() => onCategoryChange(cat)}
                />
                <label
                  htmlFor={`cat-${cat}`}
                  className="ml-2 text-gray-700 text-sm capitalize"
                >
                  {cat}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center font-semibold text-gray-800"
        >
          Fiyat
          {openSections.includes("price") ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {openSections.includes("price") && (
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="En Az"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((p) => ({ ...p, min: e.target.value }))
                }
                className="w-1/2 border rounded px-2 py-1 text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="En Çok"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((p) => ({ ...p, max: e.target.value }))
                }
                className="w-1/2 border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handlePriceApply}
                className="p-2 bg-gray-100 rounded"
              >
                <FiSearch />
              </button>
            </div>
            {/* Ön Tanımlı Aralıklar */}
            <ul className="pl-1 space-y-1">
              {presetRanges.map((range) => (
                <li key={range} className="flex items-center">
                  <input
                    type="radio"
                    name="price-range-preset"
                    className="form-radio h-4 w-4 text-orange-500"
                    onChange={() => handlePreset(range)}
                  />
                  <label className="ml-2 text-gray-700 text-sm">{range}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
