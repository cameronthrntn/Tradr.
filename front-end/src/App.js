import React from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TraderMap from './components/TraderMap';
import { ThemeProvider } from 'styled-components';

function App() {
  const theme = {
    orange: '#f77123'
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Router>
          <LandingPage path="/" />
          <TraderMap path="/traders" />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
