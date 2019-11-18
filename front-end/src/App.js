import React from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TraderMap from './components/TraderMap';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <LandingPage path="/" />
        <TraderMap path="/traders" />
      </Router>
    </div>
  );
}

export default App;
