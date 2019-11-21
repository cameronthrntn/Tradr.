import React from 'react';
import styled from 'styled-components';

export default function TraderPin(
  { username, trade, score, rate, project, avatar_ref },
  props
) {
  const Pin = styled.div`
    padding: 0.9em;
    background: ${project
      ? props => props.theme.purple
      : props => props.theme.orange};
    box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    width: 6em;
    height: 6em;
  `;

  const Score = styled.p`
    color: blue;
    font-size: 1.5em;
    margin: 0px;
  `;
  const Rate = styled.p`
    margin-top: 2px;
  `;

  const PinContent = styled.div`
    transform: rotate(45deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    border-radius: 34px;
    background: white;
  `;
  const ProjectName = styled.p`
    margin: 0px;
    padding: 10px;
  `;
  return (
    <Pin>
      <PinContent>
        {project ? (
          <ProjectName>Your Project</ProjectName>
        ) : (
          <>
            <Score>{score}</Score>
            <Rate>£{rate}/d</Rate>
          </>
        )}
      </PinContent>
    </Pin>
  );
}
