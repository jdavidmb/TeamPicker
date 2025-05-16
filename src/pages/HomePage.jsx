import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import ParticipantList from '../components/ui/ParticipantList';


const HomePage = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [teamCreated, setTeamCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/participants')
      .then(res => res.json())
      .then(data => {
        const bombo1Participants = data.filter(p => p.bombo === 1);
        console.log('Participantes cargados:', bombo1Participants);
        setParticipants(bombo1Participants);
      })
      .catch(err => console.error('Error al obtener los participantes:', err));
  }, []);

  const handleSelect = (participant) => {
    setSelected(participant);
    setMessage('');
    console.log('Participante seleccionado:', participant);
  };

  const handleCreateTeam = () => {
    if (!selected) {
      console.log('Ningún participante seleccionado');
      return;
    }

    console.log('Enviando datos al servidor:', { _id: selected._id, equipo: selected.nickname });

    fetch('http://localhost:5000/api/sorteo/asignar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: selected._id, equipo: selected.nickname }),
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(result => {
            console.log('Respuesta exitosa del servidor:', result);
            setMessage('Equipo creado, continuar');
            setTeamCreated(true);
            localStorage.setItem('equipo', selected.nickname);
          });
        } else {
          return response.json().then(error => {
            console.error('Error en la respuesta del servidor:', error);
            setMessage('Error al crear el equipo (Ya creado)');
          });
        }
      })
      .catch(error => {
        console.error('Error de conexión:', error);
        setMessage('Error al conectar con el servidor');
      });
  };


  const handleContinue = () => {
    navigate(`/bombo1/${encodeURIComponent(selected.nickname)}`);
  };

  return (
    <motion.div className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <h2 className="text-4xl font-extrabold mb-8 text-center" style={{ textShadow: '0 0 6px #003366, 0 0 12px #003366, 0 0 18px #004080, 0 0 24px #004080, 0 0 30px #0059b3, 0 0 36px #0059b3, 0 0 42px #0073e6' }}>
        Sorteo de Equipos: Streamers
      </h2>

      <Card className="max-w-2xl w-full mb-2 border-4 border-gray-700 shadow-xl bg-gradient-to-t from-black via-indigo-900 to-purple-900 p-6">
        {selected ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <img src={selected.foto_url} alt={selected.nickname} className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg" />
              <p className="text-3xl font-bold tracking-wide mt-2">{selected.nickname}</p>
              <hr className="w-full border-gray-600 my-3" />
              <Button onClick={handleCreateTeam} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md border-2 border-blue-500">
                🏆 Crear equipo
              </Button>
              {teamCreated && (
                <Button onClick={handleContinue} className="mt-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2 rounded-lg shadow-md border-2 border-green-500">
                  Continuar ➡️
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-28 h-28 mx-auto rounded-full bg-gray-700 border-4 border-gray-600"></div>
        )}
        {message && <p className="text-green-400 font-medium mt-3">{message}</p>}
      </Card>

      <div className="w-full max-w-7xl">
        <ParticipantList participants={participants} onSelect={handleSelect} />
      </div>
    </motion.div>
  );
};

export default HomePage;
