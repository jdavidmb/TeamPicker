import React, { useEffect, useState } from 'react';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ParticipantListV from '../components/ui/ParticipantListVisualization';

const BomboPage1 = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [randomParticipants, setRandomParticipants] = useState([]);

  // Cargar participantes del bombo Mundialero (bombo = 1)
  useEffect(() => {
    fetch('http://localhost:5000/api/participants/bombo/2')
      .then(res => res.json())
      .then(data => {
        setParticipants(data);
        const shuffled = data.sort(() => 0.5 - Math.random());
        setRandomParticipants(shuffled.slice(0, 3));
      })
      .catch(err => console.error('Error fetching participants:', err));
  }, []);

  const generateRandomParticipants = () => {
    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    setRandomParticipants(shuffled.slice(0, 3));
    setSelected(null);
  };

  const handleContinue = () => {
    console.log('Continuar formando el equipo con:', selected);
  };

  return (
    <div
      className="p-4 min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #000000, #0b1a4d, #2a0048)',
        fontFamily: "'Orbitron', sans-serif",
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{
          textShadow: `0 0 4px #003366, 0 0 8px #003366, 0 0 12px #004080, 0 0 16px #004080, 0 0 20px #0059b3, 0 0 24px #0059b3, 0 0 28px #0073e6`,
        }}
      >
        Sorteo de Equipos: Mundialero
      </h2>

      <div className="flex justify-center gap-6 mb-4">
        <Card
          title="Selecciona un participante"
          className="max-w-sm border-4 border-gray-500 shadow-lg"
        >
          <div className="grid grid-cols-3 gap-3">
            {randomParticipants.map((participant, index) => (
              <div
                key={index}
                className={`p-2 border-4 rounded-lg cursor-pointer w-24 h-24 flex flex-col items-center justify-center transition-transform duration-300 transform ${
                  selected?.id === participant._id
                    ? 'bg-gradient-to-t from-blue-900 via-gray-800 to-gray-700 border-blue-500'
                    : 'bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 border-gray-500'
                } hover:bg-gradient-to-t hover:from-blue-800 hover:via-gray-700 hover:to-gray-600 hover:scale-105`}
                onClick={() => participant._id && setSelected(participant)}
              >
                {participant._id ? (
                  <>
                    <img
                      src={participant.foto_url}
                      alt={participant.nickname}
                      className="w-12 h-12 rounded-full border-2 border-gray-500"
                    />
                    <p className="text-xs mt-2">{participant.nickname}</p>
                  </>
                ) : (
                  <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-3">
            <Button onClick={generateRandomParticipants}>Sortear</Button>
          </div>
        </Card>

        {selected && (
          <Card
            title="Participante Seleccionado"
            className="max-w-sm border-4 border-gray-500 shadow-lg"
          >
            <div>
              <img
                src={selected.foto_url}
                alt={selected.nickname}
                className="w-16 h-16 mx-auto rounded-full border-2 border-blue-500"
              />
              <p className="text-lg mt-2">{selected.nickname}</p>
              <Button onClick={handleContinue} className="mt-3">
                Continuar formando el equipo
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Participantes Mundialeros</h3>
        <ParticipantListV participants={participants} />
      </div>
    </div>
  );
};

export default BomboPage1;
