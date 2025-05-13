import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ParticipantListV from '../components/ui/ParticipantListVisualization';

const BomboPage1 = () => {
  const { nombre } = useParams();
  const [selected, setSelected] = useState(null);
  const [randomParticipants, setRandomParticipants] = useState(
    Array(3).fill({ id: null, nombre: '', foto: '' }) // Inicialmente en blanco
  );

  // Generación de participantes
  const participants = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    nombre: `Participante ${i + 1}`,
    foto: `https://via.placeholder.com/50`,
  }));

  // Generar 3 participantes aleatorios
  const generateRandomParticipants = () => {
    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    setRandomParticipants(shuffled.slice(0, 3));
    setSelected(null); // Reiniciar el seleccionado al sortear
  };

  // Manejar el evento del botón "Continuar formando el equipo"
  const handleContinue = () => {
    console.log('Continuar formando el equipo con:', selected);
    // Aquí puedes añadir la lógica que necesites para continuar
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-t from-black via-indigo-900 to-purple-800">
      <h2 className="text-xl font-bold mb-4 text-center text-white text-shadow-lg">Sorteo de Equipos</h2>

      {/* Tarjetas de selección de participantes y participante seleccionado */}
      <div className="flex justify-center gap-6 mb-4">
        {/* Tarjeta de selección con el botón de sorteo */}
        <Card
          title="Selecciona un participante"
          className="max-w-sm bg-gradient-to-t from-black via-indigo-800 to-purple-900 border-4 border-silver-500 shadow-xl hover:shadow-2xl"
        >
          <div className="grid grid-cols-3 gap-3">
            {randomParticipants.map((participant, index) => (
              <div
                key={index}
                className={`p-2 border-4 rounded-lg cursor-pointer w-24 h-24 flex flex-col items-center justify-center transition duration-300 ease-in-out transform ${
                  selected?.id === participant.id
                    ? 'bg-gradient-to-t from-blue-700 via-indigo-600 to-purple-600 transform scale-105 border-silver-500'
                    : 'bg-gradient-to-t from-black via-gray-800 to-indigo-900 border-silver-500'
                }`}
                onClick={() => participant.id && setSelected(participant)}
              >
                {participant.id ? (
                  <>
                    <img
                      src={participant.foto}
                      alt={participant.nombre}
                      className="w-12 h-12 rounded-full border-4 border-silver-500"
                    />
                    <p className="text-center text-xs mt-2 text-white">{participant.nombre}</p>
                  </>
                ) : (
                  <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>

          {/* Botón de sorteo dentro de la tarjeta */}
          <div className="flex justify-center mt-3">
            <Button
              onClick={generateRandomParticipants}
              className="px-3 py-2 bg-gradient-to-t from-blue-800 to-indigo-800 text-white font-semibold rounded-lg hover:from-blue-900 hover:to-indigo-900 transition duration-300 shadow-xl"
            >
              Sortear
            </Button>
          </div>
        </Card>

        {/* Participante seleccionado a la derecha */}
        {selected && (
          <Card
            title="Participante Seleccionado"
            className="max-w-sm bg-gradient-to-t from-black via-indigo-800 to-purple-900 border-4 border-silver-500 shadow-xl hover:shadow-2xl"
          >
            <div className="text-center">
              <img
                src={selected.foto}
                alt={selected.nombre}
                className="w-16 h-16 mx-auto rounded-full mt-2 border-4 border-silver-500"
              />
              <p className="text-lg mt-2 text-white">{selected.nombre}</p>
              <div className="flex justify-center mt-3">
                <Button
                  onClick={handleContinue}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-xl"
                >
                  Continuar formando el equipo
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Lista completa de participantes (solo visualización) */}
      <div className="w-full max-w-7xl mx-auto mt-3 bg-blue-800 p-4">
        <ParticipantListV participants={participants} />
      </div>
    </div>
  );
};

export default BomboPage1;

