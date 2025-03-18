import React, { useState } from 'react';
import { X, CreditCard, MapPin, Calendar, Phone, User } from 'lucide-react';
import { Car } from '../types';
import { differenceInDays, parse } from 'date-fns';

interface BookingModalProps {
  car: Car;
  startDate: string;
  endDate: string;
  location: string;
  onClose: () => void;
}

const BookingModal = ({ car, startDate, endDate, location, onClose }: BookingModalProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    cedula: '',
    phone: ''
  });

  const [step, setStep] = useState(1);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return car.price;
    
    const start = parse(startDate, 'yyyy-MM-dd', new Date());
    const end = parse(endDate, 'yyyy-MM-dd', new Date());
    const days = differenceInDays(end, start) + 1;
    return car.price * days;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    alert('¡Reserva completada con éxito!');
    setLoading(false);
    onClose();
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo
        </label>
        <div className="relative">
          <input
            type="text"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
            value={paymentDetails.name}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cédula / Pasaporte
        </label>
        <input
          type="text"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={paymentDetails.cedula}
          onChange={(e) => setPaymentDetails(prev => ({ ...prev, cedula: e.target.value }))}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono
        </label>
        <div className="relative">
          <input
            type="text"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
            placeholder="809-XXX-XXXX"
            value={paymentDetails.phone}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, phone: e.target.value }))}
          />
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre en la tarjeta
        </label>
        <input
          type="text"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={paymentDetails.name}
          onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de tarjeta
        </label>
        <div className="relative">
          <input
            type="text"
            required
            maxLength={19}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
              setPaymentDetails(prev => ({ ...prev, cardNumber: value }));
            }}
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de expiración
          </label>
          <input
            type="text"
            required
            maxLength={5}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="MM/YY"
            value={paymentDetails.expiry}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .substr(0, 5);
              setPaymentDetails(prev => ({ ...prev, expiry: value }));
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            required
            maxLength={3}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="123"
            value={paymentDetails.cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').substr(0, 3);
              setPaymentDetails(prev => ({ ...prev, cvv: value }));
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Completar Reserva</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-semibold mb-2">{car.name}</h4>
          <div className="text-gray-600 space-y-1">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-blue-500" />
              <p>Ubicación: {location || 'Santo Domingo'}</p>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-green-500" />
              <p>Fecha de recogida: {startDate || 'No seleccionada'}</p>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-red-500" />
              <p>Fecha de devolución: {endDate || 'No seleccionada'}</p>
            </div>
            <p className="text-xl font-bold text-blue-600 mt-2">
              Total: RD$ {calculateTotalPrice().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex mb-6">
          <div className={`flex-1 text-center pb-2 border-b-2 ${step === 1 ? 'border-blue-500 text-blue-500' : 'border-gray-200'}`}>
            Datos Personales
          </div>
          <div className={`flex-1 text-center pb-2 border-b-2 ${step === 2 ? 'border-blue-500 text-blue-500' : 'border-gray-200'}`}>
            Pago
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? renderPersonalInfo() : renderPaymentInfo()}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } transition`}
          >
            {loading ? 'Procesando...' : step === 1 ? 'Continuar' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;