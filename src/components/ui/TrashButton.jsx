import React from 'react';
import styled from 'styled-components';

const TrashButton = ({ onClick, title = "Eliminar equipo" }) => {
  return (
    <StyledWrapper>
      <button aria-label={title} className="delete-button" onClick={onClick} type="button">
        <svg className="trash-svg" viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
          <g id="trash-can">
            <rect x={16} y={24} width={32} height={30} rx={3} ry={3} fill="#e74c3c" />
            <g transform-origin="12 18" id="lid-group">
              <rect x={12} y={12} width={40} height={6} rx={2} ry={2} fill="#c0392b" />
              <rect x={26} y={8} width={12} height={4} rx={2} ry={2} fill="#c0392b" />
            </g>
          </g>
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .delete-button {
    position: relative;
    padding: 0.5em;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1em;
    transition: transform 0.2s ease;
    outline: none; /* <-- Esto quita el borde por defecto */
  }

  .delete-button:focus {
    outline: none; /* <-- Esto asegura que tampoco salga al hacer focus */
    box-shadow: none; /* Por si algún navegador pone sombra */
  }

  .trash-svg {
    width: 3em;
    height: 3em;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    overflow: visible;
  }

  #lid-group {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .delete-button:hover #lid-group {
    transform: rotate(-28deg) translateY(2px);
  }

  .delete-button:active #lid-group {
    transform: rotate(-12deg) scale(0.98);
  }

  .delete-button:hover .trash-svg {
    transform: scale(1.08) rotate(3deg);
  }

  .delete-button:active .trash-svg {
    transform: scale(0.96) rotate(-1deg);
  }
`;

export default TrashButton;