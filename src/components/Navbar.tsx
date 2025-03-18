import React from 'react';
import { User, Menu } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo size="medium" />

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Vehículos</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Ubicaciones</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contacto</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <User size={20} />
              Iniciar Sesión
            </button>
            <button className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;