import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ParticipantList from '../components/ui/ParticipantList';

const SorteoPage = () => {
  const [selected, setSelected] = useState(null);

  const participants = Array.from({ length: 25 }, (_, i) => ({
    nombre: `Participante ${i + 1}`,
    foto: `https://via.placeholder.com/50`,
  }));

  const handleSelect = (participant) => {
    setSelected(participant);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Sorteo de Equipos</h2>
      
      <Card title="Líder del equipo" className="w-full mb-8 max-w-2xl">
        {selected && (
          <div className="mt-4 text-center">
            <img
              src={selected.foto}
              alt={selected.nombre}
              className="w-20 h-20 mx-auto rounded-full border-4 border-gray-300"
            />
            <p className="text-xl mt-3">{selected.nombre}</p>
          </div>
        )}
      </Card>
      
      <h3 className="text-xl font-semibold text-center mb-4">Participantes:</h3>
      <div className="w-full max-w-5xl mx-auto">
        <ParticipantList participants={participants} onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default SorteoPage;

