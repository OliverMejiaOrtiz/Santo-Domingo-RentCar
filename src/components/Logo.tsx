import React from 'react';
import { Car, Key } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  let carSize: number;
  let keySize: number;
  let textSize: string;
  let subtextSize: string;

  switch (size) {
    case 'small':
      carSize = 8;
      keySize = 4;
      textSize = 'text-lg';
      subtextSize = 'text-xs';
      break;
    case 'large':
      carSize = 14;
      keySize = 7;
      textSize = 'text-2xl';
      subtextSize = 'text-sm';
      break;
    case 'medium':
    default:
      carSize = 10;
      keySize = 5;
      textSize = 'text-xl';
      subtextSize = 'text-xs';
      break;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Car className={`w-${carSize} h-${carSize} text-blue-600`} />
        <Key className={`w-${keySize} h-${keySize} text-yellow-500 absolute -bottom-1 -right-1`} />
      </div>
      <div className="flex flex-col">
        <span className={`${textSize} font-bold text-blue-700`}>BoliRentCar</span>
        <span className={`${subtextSize} text-gray-500`}>República Dominicana</span>
      </div>
    </div>
  );
};

export default Logo; 