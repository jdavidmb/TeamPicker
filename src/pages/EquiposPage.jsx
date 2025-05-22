import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import TrashButton from '../components/ui/TrashButton';
import * as Dialog from '@radix-ui/react-dialog';

const EquiposPage = () => {
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
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

  const handleDeleteTeam = async (teamName) => {
    setTeamToDelete(teamName);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + `/api/sorteo/equipo/${encodeURIComponent(teamToDelete)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-password': localStorage.getItem('clave')
        }
      });
      if (!res.ok) throw new Error('Error al eliminar el equipo');
      setResultMessage(`Equipo "${teamToDelete}" eliminado correctamente`);
      setShowResult(true);
      // Refresca los datos
      const updated = await fetch(import.meta.env.VITE_APP_API_URL + '/api/participants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-password': localStorage.getItem('clave')
        }
      }).then(r => r.json());
      setParticipants(updated);
      const grouped = updated.reduce((acc, p) => {
        const t = p.equipo || 'Sin equipo';
        if (!acc[t]) acc[t] = [];
        acc[t].push(p);
        return acc;
      }, {});
      setTeams(grouped);
    } catch (err) {
      setResultMessage('No se pudo eliminar el equipo');
      setShowResult(true);
    } finally {
      setShowConfirm(false);
      setTeamToDelete(null);
    }
  };

  const teamOptions = ['all', ...Object.keys(teams)];
  const filteredTeams = selectedTeam === 'all' ? teams : { [selectedTeam]: teams[selectedTeam] || [] };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white font-sans">
      <h2 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
        Equipos y Participantes
      </h2>

      <motion.div
        className="max-w-lg mx-auto mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-700 shadow-xl flex flex-col items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <label htmlFor="teamFilter" className="mb-3 text-xl font-semibold tracking-wide select-none">
          Filtrar por equipo
        </label>
        <select
          id="teamFilter"
          className="w-full p-3 rounded-lg text-black font-medium cursor-pointer
            border-0 ring-0 focus:border-0 focus:ring-0
            focus:outline-none focus:ring-4 focus:ring-purple-400 transition-shadow"
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
        >
          {teamOptions.map(team => (
            <option key={team} value={team}>
              {team === 'all' ? 'Todos los equipos' : team}
            </option>
          ))}
        </select>

        <Button
          onClick={() => navigate('/home')}
          className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg uppercase tracking-wider transition-colors"
        >
          Formar nuevo equipo
        </Button>
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
              {members.map(member => (
                <div key={member._id} className="flex flex-col items-center w-28">
                  <img
                    src={member.foto_url}
                    alt={member.nickname}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-600 shadow-lg"
                  />
                  <p className="mt-3 text-white font-semibold text-center truncate max-w-full">{member.nickname}</p>
                </div>
              ))}
            </div>
            {teamName !== 'Sin equipo' && (
              <div className="flex justify-center mt-6">
                <TrashButton onClick={() => handleDeleteTeam(teamName)} title={`Eliminar equipo ${teamName}`} />
              </div>
            )}
          </Card>
        ))
      )}

      {/* Modal de confirmación */}
      <Dialog.Root open={showConfirm} onOpenChange={setShowConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent" aria-describedby={undefined}>
            <Dialog.Title className="DialogTitle">¿Seguro que quieres eliminar el equipo "{teamToDelete}"?</Dialog.Title>
            <div className="flex gap-4 mt-6 justify-center">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg
                  transition-transform transition-shadow duration-150
                  hover:scale-110 hover:shadow-2xl
                  active:scale-95 active:shadow
                  focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={confirmDelete}
              >
                Sí, eliminar
              </button>
              <button
                className="bg-gray-400 text-black px-4 py-2 rounded-lg
                  transition-transform transition-shadow duration-150
                  hover:scale-110 hover:shadow-2xl
                  active:scale-95 active:shadow
                  focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Modal de resultado */}
      <Dialog.Root open={showResult} onOpenChange={setShowResult}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">{resultMessage}</Dialog.Title>
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg
                  transition-transform transition-shadow duration-150
                  hover:scale-110 hover:shadow-2xl
                  active:scale-95 active:shadow
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setShowResult(false)}
              >
                Cerrar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default EquiposPage;
