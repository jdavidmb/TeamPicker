import React from 'react';
import Card from './Card';

const ParticipantListV = ({ participants }) => {
  return (
    <Card className="w-full mx-0 p-2 bg-blue">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-1 justify-center">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="p-2 bg-blue text-center flex flex-col items-center justify-center w-32 h-32"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden shadow-lg">
              <img
                src={participant.foto_url}
                alt={participant.nickname}
                className="w-full h-full rounded-full object-cover"
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












