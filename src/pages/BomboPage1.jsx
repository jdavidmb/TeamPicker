import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ParticipantListV from '../components/ui/ParticipantListVisualization';
import * as Dialog from '@radix-ui/react-dialog';
import "./css/modal-style.css";

const BomboPage1 = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [randomParticipants, setRandomParticipants] = useState([]);
  const [equipo, setEquipo] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEquipo = localStorage.getItem('equipo');
    if (storedEquipo) {
      setEquipo(storedEquipo);
    }

    fetch(import.meta.env.VITE_APP_API_URL + '/api/participants')
      .then(res => res.json())
      .then(data => {
        const bombo1Participants = data.filter(participant => participant.bombo === 2);
        const participantsWithoutTeam = bombo1Participants.filter(participant => !participant.equipo);
        setParticipants(bombo1Participants);
        const shuffled = participantsWithoutTeam.sort(() => 0.5 - Math.random());
        setRandomParticipants(shuffled.slice(0, 3));
      })
      .catch(err => console.error('Error fetching participants:', err));
  }, []);

  const generateRandomParticipants = () => {
    const participantsWithoutTeam = participants.filter(participant => !participant.equipo);
    const shuffled = [...participantsWithoutTeam].sort(() => 0.5 - Math.random());
    setRandomParticipants(shuffled.slice(0, 3));
    setSelected(null);
    setMessage('');
  };

  const handleContinue = () => {
    if (selected) {
      fetch(import.meta.env.VITE_APP_API_URL + `/api/sorteo/equipo/${equipo}`)
        .then(response => response.json())
        .then(data => {
          const bombo2Members = data.filter(member => member.bombo === 2);
          console.log(data)
          if (bombo2Members.length > 0) {
            setMessage('No se pudo añadir, ya hay alguien en este equipo');
          } else {
            fetch(import.meta.env.VITE_APP_API_URL + '/api/sorteo/asignar', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ _id: selected._id, equipo: equipo }),
            })
              .then(response => {
                if (response.ok) {
                  setMessage('Participante añadido exitosamente');
                  setTimeout(() => navigate(`/bombo2/${encodeURIComponent(equipo)}`), 1500);
                } else {
                  setMessage('Error al añadir participante');
                }
              })
              .catch(error => {
                setMessage('Error de conexión');
                console.error('Error de conexión:', error);
              });
          }
        })
        .catch(error => {
          setMessage('Error al verificar equipo');
          console.error('Error al verificar equipo:', error);
        });
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Sorteo de Equipos: Mundialero</h2>
      {message && <p className="text-lg text-yellow-300 font-semibold mb-4">{message}</p>}

      <div className="flex justify-center gap-6 mb-4">
        <Card title="Selecciona un participante" className="max-w-sm border-4 border-gray-500 shadow-lg">
          <div className="flex justify-center mt-3">
            <Dialog.Root modal={true}>
              <Dialog.Trigger asChild>
                <Button onClick={generateRandomParticipants}>Sortear</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent" aria-describedby={undefined}
                  style={{ height: 'auto', width: 'auto', maxWidth: '90vw', maxHeight: '90vh' }}>
                  <Dialog.Title className="DialogTitle"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "42px" }}>Selecciona un participante</Dialog.Title>
                  <div className="grid grid-cols-3 gap-3">
                    {randomParticipants.map((participant, index) => (
                      <div
                        key={index}
                        className={`p-2 border-4 rounded-lg cursor-pointer w-70 h-70 flex flex-col items-center justify-center ${selected?.id === participant._id ? 'bg-blue-800 border-blue-500' : 'bg-gray-700 border-gray-500'}`}
                        onClick={() => setSelected(participant)}
                      >
                        <img
                          src={participant.foto_url}
                          alt={participant.nickname}
                          className={`w-55 h-55 rounded-full border-2 border-gray-500 ${participant.equipo ? 'grayscale' : ''}`}
                        />
                        <p className="text-lg mt-2">{participant.nickname}</p>
                      </div>
                    ))}
                  </div>

                  {selected && (
                    <div style={{ margin: '5px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                      <p className="text-lg mt-2"
                        style={{ fontFamily: "'Orbitron', sans-serif", marginBottom: '7px', fontSize: '30px' }}>
                        Has seleccionado a: {selected.nickname}
                      </p>
                      <Dialog.Close asChild>
                        <button onClick={handleContinue} className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px' }}
                        >Continuar formando el equipo ➡️</button>
                      </Dialog.Close>
                    </div>
                  )}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Card>
      </div>

      <div className="mt-2">
        <ParticipantListV participants={participants} />
      </div>
    </div>
  );
};

export default BomboPage1;
