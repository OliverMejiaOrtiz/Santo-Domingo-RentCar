import React from 'react';
import { Star, Users, Settings, Wind } from 'lucide-react';
import { Car } from '../types';
import { differenceInDays, parse } from 'date-fns';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
  startDate?: string;
  endDate?: string;
}

const CarCard = ({ car, onBook, startDate, endDate }: CarCardProps) => {
  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return car.price;
    
    const start = parse(startDate, 'yyyy-MM-dd', new Date());
    const end = parse(endDate, 'yyyy-MM-dd', new Date());
    const days = differenceInDays(end, start) + 1;
    return car.price * days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {car.category}
        </div>
        {car.popular && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Popular
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-gray-600">{car.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {car.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              {index === 0 && <Users size={16} />}
              {index === 1 && <Settings size={16} />}
              {index === 2 && <Wind size={16} />}
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">RD$ {calculateTotalPrice().toLocaleString()}</span>
            <span className="text-gray-500">{startDate && endDate ? ' total' : '/día'}</span>
          </div>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => onBook(car)}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;