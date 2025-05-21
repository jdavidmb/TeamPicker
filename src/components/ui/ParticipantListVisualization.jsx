import React from 'react';
import Card from './Card';

const ParticipantListV = ({ participants }) => {
  return (
    <Card className="w-full max-w-screen-xl mx-auto p-4 bg-gradient-to-t from-black via-indigo-900 to-purple-900 border border-gray-600 shadow-lg text-whitew-full mx-0 p-2 bg-blue">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="p-2 bg-blue text-center flex flex-col items-center justify-center w-32 h-32"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden shadow-lg">
              <img
                src={participant.foto_url}
                alt={participant.nickname}
                className={`w-full h-full rounded-full object-cover ${participant.equipo ? 'grayscale' : ''}`}
              />
            </div>
            <p className="text-center text-sm mt-1 text-white">{participant.nickname}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ParticipantListV;













