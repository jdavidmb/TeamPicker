import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ParticipantList from '../components/ui/ParticipantList';

const EquiposPage = () => {
  const [selected, setSelected] = useState(null);

  const participants = Array.from({ length: 25 }, (_, i) => ({
    nombre: `Participante ${i + 1}`,
    foto: `https://via.placeholder.com/50`,
  }));

  const handleSorteo = () => {
    const winner = participants[Math.floor(Math.random() * participants.length)];
    setSelected(winner);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Sorteo de Equipos</h2>

      {/* Botón general de sorteo */}
      <div className="flex justify-center mb-4">
        <Button onClick={handleSorteo}>Sortear</Button>
      </div>

      {/* Tarjeta del líder seleccionado */}
      <Card title="Líder del equipo">
        {selected ? (
          <div className="mt-4 text-center">
            <img
              src={selected.foto}
              alt={selected.nombre}
              className="w-16 h-16 mx-auto rounded-full"
            />
            <p className="text-xl mt-2">{selected.nombre}</p>
          </div>
        ) : (
          <p className="text-gray-500">Aún no hay líder seleccionado</p>
        )}
      </Card>

      {/* Lista de participantes */}
      <h3 className="text-2xl mt-6">Participantes:</h3>
      <ParticipantList participants={participants} />
    </div>
  );
};

export default EquiposPage;
