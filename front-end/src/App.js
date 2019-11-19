import React from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LogInForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
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
          <LogInForm path="/login"></LogInForm>
          <SignUpForm path="/sign-up"></SignUpForm>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
