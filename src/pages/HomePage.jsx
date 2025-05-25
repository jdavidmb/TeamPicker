import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import ParticipantList from '../components/ui/ParticipantList';
import { m, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import "./css/modal-style.css";

const HomePage = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [teamCreated, setTeamCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API_URL + '/api/participants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-password': localStorage.getItem('clave')
      }
    })
      .then(res => res.json())
      .then(data => {
        const bombo1Participants = data.filter(p => p.bombo === 1);
        console.log('Participantes cargados:', bombo1Participants);
        setParticipants(bombo1Participants);
      })
      .catch(err => {
        console.error('Error al obtener los participantes:', err);
        setMessage('Error al cargar participantes.');
      });
  }, []);

  const handleSelect = (participant) => {
    setSelected(participant);
    setMessage('');
    console.log('Participante seleccionado:', participant);
  };

  const handleCreateTeam = () => {
    if (!selected) {
      setMessage('Por favor, selecciona un participante primero.');
      return;
    }

    try {
      fetch(import.meta.env.VITE_APP_API_URL + '/api/sorteo/asignar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-password': localStorage.getItem('clave')
        },
        body: JSON.stringify({ _id: selected._id, equipo: selected.nickname }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al crear el equipo');
          return response.json();
        })
        .then(result => {
          console.log('Equipo creado:', result);
          setTeamCreated(true);
          localStorage.setItem('equipo', selected.nickname);
        })
        .catch(error => {
          console.error('Error en la creación del equipo:', error);
          setMessage('Error al crear el equipo: ' + error.message);
        });
    } catch (error) {
      console.error('Error inesperado:', error);
      setMessage('Error inesperado: ' + error.message);
    }
  };

  const handleContinue = () => {
    if (teamCreated) {
      navigate(`/bombo1/${encodeURIComponent(selected.nickname)}`);
    } else {
      setMessage('Crea el equipo antes de continuar.');
    }
  };

  return (
    <motion.div className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-tr from-black via-indigo-900 to-purple-900"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
>
      <h2 className="text-4xl font-extrabold mb-8 text-center" style={{ textShadow: '0 0 6px #003366, 0 0 12px #003366' }}>
        Sorteo de Equipos: Streamers
      </h2>
      <button
        onClick={() => navigate('/equipos')}
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        
        className={`custom-button`}
      >
        Ver Equipos
      </button>
      <div style={{ height: 10 }} />
      <Card className="max-w-2xl w-full mb-2 border-4 border-gray-700 shadow-xl p-6">
        {selected ? (
          <div className="flex flex-col items-center gap-3">
            <img src={selected.foto_url} alt={selected.nickname} className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover" />
            <p className="text-3xl font-bold mt-2">{selected.nickname}</p>
            <Dialog.Root modal={true} open={teamCreated}>
              <Dialog.Trigger asChild>
                <Button onClick={handleCreateTeam} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Crear equipo</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent"
                  onInteractOutside={(event) => event.preventDefault()}>
                  <Dialog.Title className="DialogTitle"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>Equipo creado con éxito.</Dialog.Title>
                  <img src={selected.foto_url} alt={selected.nickname} className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover" />
                  <Dialog.Description className="text-3xl font-bold mt-2"
                    style={{ fontFamily: "'Orbitron', sans-serif", marginBottom: '7px' }}>
                    {selected.nickname}
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button onClick={handleContinue} className={`custom-button`}
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >Continuar ➡️</button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        ) : (
          <p className="text-center">Selecciona un participante para crear el equipo.</p>
        )}
        {message && <p className="text-yellow-400 mt-3">{message}</p>}
      </Card>
      <ParticipantList participants={participants} onSelect={handleSelect} />
    </motion.div>
  );
};

export default HomePage;