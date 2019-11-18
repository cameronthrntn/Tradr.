import React from 'react';
import styled from 'styled-components';

export default function TraderPin({ username, score, rate, project }) {
  const Pin = styled.div`
    padding: 0.5em;
    width: 50px;
    background: white;
    border: 2px solid ${project ? 'blue' : 'orange'};
    border-radius: 5px;
  `;
  return (
    <Pin>
      {project ? (
        <p>Your Project</p>
      ) : (
        <>
          <p>{username}</p>
          <p>{score}</p>
          <p>£{rate}/d</p>
        </>
      )}
    </Pin>
  );
}
