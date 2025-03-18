import React from 'react';

const Hero = () => {
  const handleReserveNow = () => {
    // Aquí podrías abrir un modal de reserva o redirigir a una página de reservas
    alert('Funcionalidad de reserva aún no implementada');
  };

  const handleViewSpecialOffers = () => {
    // Aquí podrías desplazar la página hacia la sección de ofertas especiales
    alert('Funcionalidad de ofertas especiales aún no implementada');
  };

  return (
    <div className="relative h-[500px] bg-cover bg-center" style={{
      backgroundImage: 'url("/Destinos/punta cana.webp")'
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Descubre los Tesoros de República Dominicana
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Explora playas, montañas y ciudades con la libertad que te brinda tener tu propio vehículo.
            Ofrecemos los mejores precios y una flota bien mantenida para tu tranquilidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleReserveNow} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Reserva Ahora
            </button>
            <button onClick={handleViewSpecialOffers} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-800 transition">
              Ver Ofertas Especiales
            </button>
          </div>
          <div className="mt-8 flex items-center">
            <div className="bg-white bg-opacity-25 backdrop-blur-sm py-2 px-4 rounded-full text-white font-semibold">
              <span className="text-yellow-300 font-bold">¡NUEVO!</span> Entrega y recogida en aeropuertos y hoteles de todo el país
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;