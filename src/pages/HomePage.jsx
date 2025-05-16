import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import ParticipantList from '../components/ui/ParticipantList';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [teamCreated, setTeamCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://team-picker-backend.onrender.com/api/participants')
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
      fetch('http://localhost:5000/api/sorteo/asignar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: selected._id, equipo: selected.nickname }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al crear el equipo');
          return response.json();
        })
        .then(result => {
          console.log('Equipo creado:', result);
          setMessage('Equipo creado con éxito.');
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
    <motion.div className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <h2 className="text-4xl font-extrabold mb-8 text-center" style={{ textShadow: '0 0 6px #003366, 0 0 12px #003366' }}>
        Sorteo de Equipos: Streamers
      </h2>
      <Card className="max-w-2xl w-full mb-2 border-4 border-gray-700 shadow-xl p-6">
        {selected ? (
          <div className="flex flex-col items-center gap-3">
            <img src={selected.foto_url} alt={selected.nickname} className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover" />
            <p className="text-3xl font-bold mt-2">{selected.nickname}</p>
            <Button onClick={handleCreateTeam} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Crear equipo</Button>
            {teamCreated && (
              <Button onClick={handleContinue} className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Continuar ➡️</Button>
            )}
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
 