import React from 'react'
import styled from 'styled-components';

export default function LandingPage() {
  const Test = styled.h1`
  color: ${props => props.theme.orange};
  `
  return (
    <Test>
      Landing Page
    </Test>
  )
}
