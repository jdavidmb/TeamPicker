import React, { useState } from 'react';
import Card from './Card';

const ParticipantList = ({ participants, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (participant) => {
    setSelected(participant.nickname);
    onSelect(participant);
  };

  return (
    <Card className="w-full max-w-screen-xl mx-auto p-4 bg-gradient-to-t from-black via-indigo-900 to-purple-900 border border-gray-600 shadow-lg text-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1">
        {participants.map((participant, index) => (
          <div
            key={index}
            onClick={() => handleSelect(participant)}
            className="relative group cursor-pointer transition-transform transform hover:scale-105"
          >
            <div
              className={`w-14 h-14 mx-auto rounded-full overflow-hidden shadow-lg group-hover:ring-2 group-hover:ring-blue-500 transition-all duration-300 ease-in-out
                ${selected === participant.nickname ? 'ring-4 ring-blue-500' : ''}`}
            >
              <img
                src={participant.foto_url}
                alt={participant.nickname}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-sm mt-1 font-orbitron text-white">{participant.nickname}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ParticipantList;
