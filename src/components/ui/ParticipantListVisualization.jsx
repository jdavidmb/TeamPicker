import React from 'react';
import Card from './Card';  // Asegúrate de importar el Card

const ParticipantListV = ({ participants }) => {
  return (
    <Card className="w-full mx-0 p-2 bg-blue-900"> {/* Fondo azul oscuro para la tarjeta */}
      {/* Grilla para los participantes: 11 por fila en pantallas grandes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-1 justify-center">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg bg-blue-800 text-center flex flex-col items-center justify-center w-28 h-16"  // Fondo azul oscuro
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:ring-4 group-hover:ring-blue-500 group-hover:shadow-xl transition-all duration-300 ease-in-out">
              <img
                src={participant.foto}
                alt={participant.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-xs mt-1 text-white">{participant.nombre}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ParticipantListV;










