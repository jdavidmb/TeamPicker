import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import ParticipantList from '../components/ui/ParticipantList';

const HomePage = () => {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/participants')
      .then(res => res.json())
      .then(data => {
        const bombo1Participants = data.filter(p => p.bombo === 1);
        console.log('Participantes cargados:', bombo1Participants); // ✅ Verificar carga
        setParticipants(bombo1Participants);
      })
      .catch(err => console.error('Error al obtener los participantes:', err));
  }, []);

  const handleSelect = (participant) => {
    setSelected(participant);
    setMessage('');
    console.log('Participante seleccionado:', participant); // ✅ Verificar selección
  };

  const handleCreateTeam = async () => {
    if (!selected) {
      console.log('Ningún participante seleccionado'); // ⚠️ Advertencia
      return;
    }

    try {
      console.log('Enviando datos al servidor:', { 
        nickname: selected.nickname, 
        equipo: selected.nickname 
      }); // ✅ Verificar datos antes de enviar

      const response = await fetch('http://localhost:5000/api/sorteo/asignar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: selected.nickname, equipo: selected.nickname }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Respuesta exitosa del servidor:', result); // ✅ Verificar respuesta exitosa
        setMessage('Equipo creado, continuar');
      } else {
        const error = await response.json();
        console.error('Error en la respuesta del servidor:', error); // ❌ Verificar error en la respuesta
        setMessage('Error al crear el equipo');
      }
    } catch (error) {
      console.error('Error de conexión:', error); // ❌ Error de conexión
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div
      className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <h2
        className="text-4xl font-extrabold mb-8 text-center"
        style={{
          textShadow:
            '0 0 6px #003366, 0 0 12px #003366, 0 0 18px #004080, 0 0 24px #004080, 0 0 30px #0059b3, 0 0 36px #0059b3, 0 0 42px #0073e6',
        }}
      >
        Sorteo de Equipos: Streamers
      </h2>

      <Card className="max-w-4xl w-full mb-10 border-4 border-gray-700 shadow-xl bg-gradient-to-t from-black via-indigo-900 to-purple-900 p-6">
        {selected ? (
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={selected.foto_url}
                alt={selected.nickname}
                className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg"
              />
              <p className="text-3xl font-bold tracking-wide">{selected.nickname}</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <button
                onClick={handleCreateTeam}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Crear equipo
              </button>
              {message && <p className="text-green-400 font-medium">{message}</p>}
            </div>
          </div>
        ) : (
          <div className="w-28 h-28 mx-auto rounded-full bg-gray-700 border-4 border-gray-600 animate-pulse"></div>
        )}
      </Card>

      <div className="w-full max-w-7xl">
        <ParticipantList participants={participants} onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default HomePage;
