import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const  BomboPage3 = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);

  const participants = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    nombre: `Participante ${i + 1}`,
    foto: `https://via.placeholder.com/50`,
  }));

  const handleSorteo = () => {
    const winner = participants[Math.floor(Math.random() * participants.length)];
    setSelected(winner);
  };

  const selectedParticipant = participants.find((p) => p.id === parseInt(id));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Sorteo de Equipos</h2>

      <Card title="Líder del equipo">
        {selectedParticipant ? (
          <div className="mt-4 text-center">
            <img
              src={selectedParticipant.foto}
              alt={selectedParticipant.nombre}
              className="w-20 h-20 mx-auto rounded-full"
            />
            <p className="text-xl mt-2">{selectedParticipant.nombre}</p>
          </div>
        ) : (
          <p className="text-gray-500">Aún no hay líder seleccionado</p>
        )}
      </Card>

      {/* Botón general de sorteo */}
      <div className="flex justify-center mt-4">
        <Button onClick={handleSorteo}>Sortear</Button>
      </div>

      {selected && (
        <div className="mt-4 text-center">
          <img
            src={selected.foto}
            alt={selected.nombre}
            className="w-16 h-16 mx-auto rounded-full"
          />
          <p className="text-xl mt-2">{selected.nombre}</p>
        </div>
      )}
    </div>
  );
};


export default BomboPage3;
