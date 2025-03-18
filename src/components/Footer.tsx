import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo size="small" />
            <p className="mt-4 text-gray-300">
              Ofrecemos los mejores servicios de alquiler de vehículos en toda la República Dominicana con precios competitivos y servicio personalizado.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Inicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Vehículos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Destinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Ofertas Especiales</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Alquiler de Vehículos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Transporte al Aeropuerto</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Tours Privados</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Servicio de Chofer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Asistencia en Carretera</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-400 mt-1" size={20} />
                <span>Av. 27 de Febrero 123, Santo Domingo, República Dominicana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-400" size={20} />
                <span>+1 (809) 555-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-400" size={20} />
                <span>info@bolirentcar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BoliRentCar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;