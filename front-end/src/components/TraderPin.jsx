import React from 'react';
import styled from 'styled-components';

export default function TraderPin(
  { username, trade, score, rate, project, avatar_ref },
  props
) {
  const Pin = styled.div`
    padding: 0.9em;
    background: ${project
      ? props => props.theme.user
      : props => props.theme.trader};
    box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    width: 6em;
    height: 6em;
    transition: 0.2s;
    &:hover {
      transform: scale(1.1) rotate(-45deg);
      transition: 0.2s;
      cursor: pointer;
    }
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
            <Score>{score === 0 ? 'n/a' : score}</Score>
            <Rate>£{rate}/d</Rate>
          </>
        )}
      </PinContent>
    </Pin>
  );
}
