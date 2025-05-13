import React from 'react';
import Card from './Card';  // Asegúrate de importar el Card

const ParticipantList = ({ participants, onSelect }) => {
  return (
    <Card title="Lista de Participantes" className="w-full max-w-screen-xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {participants.map((participant, index) => (
          <div
            key={index}
            onClick={() => onSelect(participant)}
            className="relative group cursor-pointer transition-transform transform hover:scale-105"
          >
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden shadow-lg group-hover:ring-4 group-hover:ring-blue-500 group-hover:shadow-xl transition-all duration-300 ease-in-out">
              <img
                src={participant.foto}
                alt={participant.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-2">{participant.nombre}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ParticipantList;


