import React, { useEffect, useState } from 'react';
import ParticipantListV from '../components/ui/ParticipantListVisualization';
import Card from '../components/ui/Card';

const EquiposPage = () => {
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/participants')
      .then(res => res.json())
      .then(data => {
        setParticipants(data);

        // Agrupar participantes por equipo o "Sin equipo"
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

  // Opciones de filtro, incluye "all" para mostrar todos
  const teamOptions = ['all', ...Object.keys(teams)];

  // Equipos filtrados según selección
  const filteredTeams = selectedTeam === 'all' ? teams : { [selectedTeam]: teams[selectedTeam] || [] };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Equipos y Participantes</h2>

      {message && (
        <p className="text-lg text-yellow-300 font-semibold mb-4">{message}</p>
      )}

      <div className="mb-4 flex justify-center">
        <label htmlFor="teamFilter" className="mr-2 mt-1 font-semibold text-white">Filtrar por equipo:</label>
        <select
          id="teamFilter"
          className="p-2 rounded text-black"
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
        >
          {teamOptions.map(team => (
            <option key={team} value={team}>
              {team === 'all' ? 'Todos los equipos' : team}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(filteredTeams).length === 0 && <p className="text-center">No hay participantes para mostrar.</p>}

      {Object.entries(filteredTeams).map(([teamName, members]) => (
        <Card key={teamName} title={`Equipo: ${teamName}`}>
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            {members.map(member => (
              <div key={member._id} className="flex flex-col items-center w-24">
                <img
                  src={member.foto_url}
                  alt={member.nickname}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="text-sm mt-1 text-center">{member.nickname}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EquiposPage;

