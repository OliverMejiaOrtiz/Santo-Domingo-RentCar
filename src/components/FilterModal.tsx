import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterModalProps {
  onClose: () => void;
  onApply: (category: string, priceRange: { min: number; max: number }) => void;
  initialCategory: string;
  initialPriceRange: { min: number; max: number };
}

const FilterModal = ({ onClose, onApply, initialCategory, initialPriceRange }: FilterModalProps) => {
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  const categories = ['', 'SUV', 'Sedán', 'Pickup'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Filtros</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precio (RD$/día)
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                min="0"
                step="100"
                max={priceRange.max}
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Mín"
              />
              <input
                type="number"
                min={priceRange.min}
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Máx"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>RD$ 0</span>
              <span>RD$ 10,000</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onApply(category, priceRange)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;