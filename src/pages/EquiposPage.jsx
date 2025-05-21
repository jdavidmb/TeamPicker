import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const EquiposPage = () => {
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/participants')
      .then(res => res.json())
      .then(data => {
        setParticipants(data);

        const grouped = data.reduce((acc, p) => {
          const teamName = p.equipo || 'Sin equipo';
          if (!acc[teamName]) acc[teamName] = [];
          acc[teamName].push(p);
          return acc;
        }, {});

        setTeams(grouped);
      })
      .catch(err => {
        console.error('Error fetching participants:', err);
        setMessage('Error al cargar participantes');
      });
  }, []);

  const teamOptions = ['all', ...Object.keys(teams)];
  const filteredTeams = selectedTeam === 'all' ? teams : { [selectedTeam]: teams[selectedTeam] || [] };

  return (
    <div
      className="p-6 min-h-screen bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white font-sans"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
        Equipos y Participantes
      </h2>

      <motion.div
        className="max-w-lg mx-auto mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-900 via-purple-900 to-purple-950 shadow-xl flex flex-col items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <label
          htmlFor="teamFilter"
          className="mb-3 text-xl font-semibold tracking-wide select-none"
        >
          Filtrar por equipo
        </label>
        <select
          id="teamFilter"
          className="w-full p-3 rounded-lg text-black font-medium cursor-pointer
            focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {teamOptions.map((team) => (
            <option key={team} value={team}>
              {team === 'all' ? 'Todos los equipos' : team}
            </option>
          ))}
        </select>

        <div className="w-full mt-6 flex justify-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg uppercase tracking-wider transition-colors"
          >
            Formar nuevo equipo
          </Button>
        </div>
      </motion.div>

      {message && (
        <p className="text-yellow-400 text-center mb-6 font-semibold">{message}</p>
      )}

      {Object.keys(filteredTeams).length === 0 ? (
        <p className="text-center text-gray-300">No hay participantes para mostrar.</p>
      ) : (
        Object.entries(filteredTeams).map(([teamName, members]) => (
          <Card key={teamName} title={`Equipo: ${teamName}`} className="mb-8 max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-6 justify-center">
              {members.map((member) => (
                <div key={member._id} className="flex flex-col items-center w-28">
                  <img
                    src={member.foto_url}
                    alt={member.nickname}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-600 shadow-lg"
                  />
                  <p className="mt-3 text-white font-semibold text-center truncate max-w-full">
                    {member.nickname}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default EquiposPage;
