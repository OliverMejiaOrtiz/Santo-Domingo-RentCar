import React, { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  filters: SearchFilters;
}

const SearchBar = ({ onSearch, filters }: SearchBarProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const handleSearch = () => {
    onSearch(localFilters);
  };

  return (
    <div className="container mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
            <MapPin className="text-blue-600" />
            <div className="flex-1">
              <label className="block text-sm text-gray-500">Ubicación</label>
              <select 
                className="w-full bg-transparent text-gray-800 focus:outline-none"
                value={localFilters.location}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
              >
                <option value="">Seleccionar ubicación</option>
                <option value="santo-domingo">Santo Domingo</option>
                <option value="punta-cana">Punta Cana</option>
                <option value="santiago">Santiago</option>
                <option value="puerto-plata">Puerto Plata</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
            <Calendar className="text-blue-600" />
            <div className="flex-1">
              <label className="block text-sm text-gray-500">Fecha de Recogida</label>
              <input 
                type="date" 
                className="w-full bg-transparent text-gray-800 focus:outline-none"
                value={localFilters.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" />
            <div className="flex-1">
              <label className="block text-sm text-gray-500">Fecha de Devolución</label>
              <input 
                type="date" 
                className="w-full bg-transparent text-gray-800 focus:outline-none"
                value={localFilters.endDate}
                min={localFilters.startDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSearch}
          >
            <Search size={20} />
            Buscar Vehículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;