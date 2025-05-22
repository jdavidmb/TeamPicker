import Button from '../components/ui/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticipantListV from '../components/ui/ParticipantListVisualization';
import * as Dialog from '@radix-ui/react-dialog';
import './css/modal-style.css';

const BomboPage2 = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [randomParticipants, setRandomParticipants] = useState([]);
  const [equipo, setEquipo] = useState('');
  const [message, setMessage] = useState('');
  const [rolling, setRolling] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEquipo = localStorage.getItem('equipo');
    if (storedEquipo) {
      setEquipo(storedEquipo);
    }

    fetch(import.meta.env.VITE_APP_API_URL + '/api/participants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-password': localStorage.getItem('clave')
      }
    })
      .then(res => res.json())
      .then(data => {
        const bombo1Participants = data.filter(p => p.bombo === 3);
        setParticipants(bombo1Participants);
      })
      .catch(err => console.error('Error fetching participants:', err));
  }, []);

  const startSlotMachine = () => {
    setRolling(true);
    setMessage('');
    setSelected(null);
    setModalOpen(true);

    let count = 0;
    const interval = setInterval(() => {
      const withoutTeam = participants.filter(p => !p.equipo);
      const shuffled = [...withoutTeam].sort(() => 0.5 - Math.random());
      setRandomParticipants(shuffled.slice(0, 3));
      count++;
      if (count > 15) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 100);
  };

  const handleContinue = () => {
    if (!selected) return;

    fetch(import.meta.env.VITE_APP_API_URL + `/api/sorteo/equipo/${equipo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-password': localStorage.getItem('clave')
      }
    })
      .then(res => res.json())
      .then(data => {
        const bombo2Members = data.filter(m => m.bombo === 3);
        if (bombo2Members.length > 0) {
          setMessage('❌ Este equipo ya tiene un integrante de este bombo');
        } else {
          fetch(import.meta.env.VITE_APP_API_URL + '/api/sorteo/asignar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-password': localStorage.getItem('clave')
            },
            body: JSON.stringify({ _id: selected._id, equipo }),
          }).then(res => {
            if (res.ok) {
              setMessage('✅ Participante añadido exitosamente');
              setTimeout(() => navigate(`/bombo3/${encodeURIComponent(equipo)}`), 1500);
            } else {
              setMessage('❌ Error al añadir participante');
            }
          }).catch(() => {
            setMessage('❌ Error de conexión con el servidor');
          });
        }
      })
      .catch(() => {
        setMessage('❌ Error al verificar equipo');
      });
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white font-sans">
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Sorteo de Equipos: Seguidor 🎮
      </h2>

      {message && (
        <div className="mb-4 text-center text-lg px-4 py-2 rounded-lg bg-indigo-700 shadow-lg">
          <p className="text-yellow-300 font-semibold">{message}</p>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <Button
          onClick={startSlotMachine}
          disabled={rolling}
          className={`bg-purple-700 hover:bg-purple-900 text-white font-bold px-12 py-6 rounded-xl shadow-lg transition-all ${rolling ? 'cursor-not-allowed opacity-70' : ''
            }`}
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '22px' }}
        >
          {rolling ? '🎰 Sorteando...' : '🎰 Sortear'}
        </Button>
      </div>

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content aria-describedby={undefined}
            className="DialogContent bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-900 rounded-xl shadow-2xl p-6"
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
          >
            <Dialog.Title
              className="text-3xl text-center text-blue-300 mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Selecciona un participante
            </Dialog.Title>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
              {randomParticipants.map((participant, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border-4 cursor-pointer flex flex-col items-center transition-all duration-300 ${selected?._id === participant._id
                    ? 'bg-blue-800 border-blue-400'
                    : 'bg-gray-900 border-indigo-600 hover:border-yellow-300'
                    }`}
                  onClick={() => !rolling && setSelected(participant)}
                >
                  <img
                    src={participant.foto_url}
                    alt={participant.nickname}
                    className={`w-32 h-32 rounded-full border-2 ${participant.equipo ? 'grayscale' : ''
                      }`}
                  />
                  <p
                    className="mt-2 text-lg font-medium text-white"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {participant.nickname}
                  </p>
                </div>
              ))}
            </div>

            {(rolling || (modalOpen && !selected)) && (
              <div
                className="flex flex-col items-center justify-center mt-6 space-y-4"
                style={{ minHeight: '96px', height: '96px' }}
              >
                {rolling ? (
                  <>
                    <svg
                      className="animate-spin h-16 w-16 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <p
                      className="text-yellow-300 text-2xl font-semibold"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      Sorteando...
                    </p>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        className="animate-check"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p
                      className="text-green-300 text-2xl font-semibold"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      ¡Listo!
                    </p>

                    <style>{`
                      .animate-check {
                        animation: dash 1s ease forwards;
                      }
                      @keyframes dash {
                        to {
                          stroke-dashoffset: 0;
                        }
                      }
                    `}</style>
                  </>
                )}
              </div>
            )}

            {selected && (
              <div className="mt-6 text-center">
                <p
                  className="text-2xl text-yellow-200 mb-4"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Has seleccionado a: <span className="text-white">{selected.nickname}</span>
                </p>
                <Dialog.Close asChild>
                  <Button
                    onClick={handleContinue}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Continuar formando el equipo ➡️
                  </Button>
                </Dialog.Close>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="mt-6">
        <ParticipantListV participants={participants} />
      </div>
    </div>
  );
};

export default BomboPage2;

