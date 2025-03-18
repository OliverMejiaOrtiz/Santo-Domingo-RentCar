import React, { useState, useCallback, useMemo } from 'react';
import { Car as CarIcon, Calendar, MapPin, CreditCard, Search, Filter, Star, Phone } from 'lucide-react';
import { Car, SearchFilters } from './types';
import { carsData } from './data/cars';
import CarCard from './components/CarCard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FilterModal from './components/FilterModal';

function App() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    startDate: '',
    endDate: '',
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      const matchesCategory = !selectedCategory || car.category === selectedCategory;
      const matchesPrice = car.price >= priceRange.min && car.price <= priceRange.max;
      const matchesLocation = !filters.location || car.available;
      return matchesCategory && matchesPrice && matchesLocation;
    });
  }, [selectedCategory, priceRange, filters.location]);

  const popularCars = useMemo(() => {
    return carsData.filter(car => car.popular);
  }, []);

  const handleSearch = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const handleBooking = useCallback((car: Car) => {
    setSelectedCar(car);
    setShowBookingModal(true);
  }, []);

  const handleFilterApply = useCallback((category: string, price: { min: number; max: number }) => {
    setSelectedCategory(category);
    setPriceRange(price);
    setShowFilterModal(false);
  }, []);

  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  const handleSearchClick = () => {
    // Aquí podrías implementar la lógica de búsqueda
    alert('Funcionalidad de búsqueda aún no implementada');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <SearchBar
        onSearch={handleSearch}
        filters={filters}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Sección de vehículos populares */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-3 rounded-full mr-3">
              <Star className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Vehículos Más Populares</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCars.map((car) => (
              <CarCard 
                key={car.id} 
                car={car} 
                onBook={handleBooking}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
            ))}
          </div>
        </section>

        {/* Sección de ofertas especiales */}
        <section className="mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ofertas Especiales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Reserva Anticipada</h3>
                <p className="mb-4">Obtén un 10% de descuento cuando reservas con al menos 7 días de anticipación.</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Ver Detalles
                </button>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Oferta de Fin de Semana</h3>
                <p className="mb-4">Alquila por 3 días y paga solo 2 en reservas de viernes a lunes.</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de paquetes de alquiler */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Paquetes de Alquiler</h2>
          <p className="text-gray-600 mb-8">Elige el paquete que mejor se adapte a tus necesidades de viaje en República Dominicana.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Básico</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  RD$ 2,500<span className="text-sm text-gray-500 font-normal">/día</span>
                </div>
                <p className="text-gray-600">Perfecto para viajes cortos en la ciudad y alrededores.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Kilometraje ilimitado
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Seguro básico
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Asistencia en carretera
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    GPS incluido
                  </li>
                </ul>
                <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Seleccionar
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-400 transform scale-105 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Más Popular
              </div>
              <div className="p-6 border-b border-gray-100 bg-blue-50">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Turista</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  RD$ 3,800<span className="text-sm text-gray-500 font-normal">/día</span>
                </div>
                <p className="text-gray-600">Ideal para explorar la isla con todas las comodidades.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Kilometraje ilimitado
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Seguro completo
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Asistencia en carretera
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    GPS incluido
                  </li>
                </ul>
                <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Seleccionar
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Premium</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  RD$ 5,200<span className="text-sm text-gray-500 font-normal">/día</span>
                </div>
                <p className="text-gray-600">La experiencia más lujosa para tu viaje en República Dominicana.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Kilometraje ilimitado
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Seguro todo riesgo
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Asistencia VIP
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    GPS y WiFi móvil
                  </li>
                </ul>
                <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Vehículos Disponibles</h2>
            <div className="flex gap-2">
              <button 
                onClick={handleFilterClick}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <Filter size={20} />
                Filtrar
              </button>
              <button 
                onClick={handleSearchClick}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <Search size={20} />
                Buscar
              </button>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No se encontraron vehículos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onBook={handleBooking}
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                />
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <CarIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flota Bien Mantenida</h3>
              <p className="text-gray-600">Vehículos en excelente estado, mantenidos regularmente para su seguridad y comodidad.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagos Seguros</h3>
              <p className="text-gray-600">Proceso de pago seguro y transparente con las mejores tarifas en pesos dominicanos.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">Asistencia en carretera y atención al cliente disponible todo el día en toda la República Dominicana.</p>
            </div>
          </div>
        </section>

        {/* Sección de destinos turísticos */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Explora los Mejores Destinos</h2>
          <p className="text-gray-600 mb-8">Con nuestros vehículos puedes visitar los mejores destinos turísticos de República Dominicana con toda comodidad.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/Destinos/Playa Babaro.jpg" 
                  alt="Playa Bávaro"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Playa Bávaro</h3>
                <p className="text-gray-600 mb-4">Una de las playas más hermosas del Caribe, con arenas blancas y aguas cristalinas. Perfecta para relajarse y disfrutar del sol.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">2 horas desde Santo Domingo</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">Ver ruta</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/Destinos/excursion-samana-punta-cana.jpg" 
                  alt="Samaná"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Samaná</h3>
                <p className="text-gray-600 mb-4">Península paradisíaca con hermosas playas, cascadas y observación de ballenas jorobadas durante la temporada.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">3 horas desde Santo Domingo</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">Ver ruta</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/Destinos/Puerto Plata.avif" 
                  alt="Puerto Plata"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Puerto Plata</h3>
                <p className="text-gray-600 mb-4">Destino impresionante en la costa norte con playas, montañas y el teleférico que ofrece vistas panorámicas.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">3.5 horas desde Santo Domingo</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">Ver ruta</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/Destinos/zona colonial.jpg" 
                  alt="Zona Colonial"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Zona Colonial</h3>
                <p className="text-gray-600 mb-4">El corazón histórico de Santo Domingo, con sus calles empedradas, edificios coloniales y rica cultura.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">En Santo Domingo</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">Ver ruta</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/Destinos/punta cana.webp" 
                  alt="Punta Cana"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Punta Cana</h3>
                <p className="text-gray-600 mb-4">Famoso destino con kilómetros de hermosas playas, lujosos resorts y actividades acuáticas para todos.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">2.5 horas desde Santo Domingo</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">Ver ruta</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/Destinos/ISLA-SAONA-@saonaisland-edited-1024x683.jpg" 
                  alt="Isla Saona"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Isla Saona</h3>
                <p className="text-gray-600 mb-4">Isla paradisíaca con playas vírgenes de arena blanca, aguas turquesas y paisajes naturales impresionantes.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">4 horas + bote desde Santo Domingo</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">Ver ruta</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center">
              Ver más destinos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>
      </main>
      
      <Footer />

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={handleFilterApply}
          initialCategory={selectedCategory}
          initialPriceRange={priceRange}
        />
      )}

      {showBookingModal && selectedCar && (
        <BookingModal
          car={selectedCar}
          startDate={filters.startDate}
          endDate={filters.endDate}
          location={filters.location}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
}

export default App;