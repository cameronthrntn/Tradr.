import React, { Component } from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LogInForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TraderMap from './components/TraderMap';
import { ThemeProvider } from 'styled-components';
import { getProject } from './utils/projects.js';
import { getUser } from './utils/users.js';
import { getTrader } from './utils/traders.js';
import NotFound from './components/404NotFound';
import { AppProvider } from './components/AppContext';
import DashBoard from './components/DashBoard';
import LoginForm from './components/LoginForm';
import TraderProfile from './components/TraderProfile';

export default class App extends Component {
  state = {
    user: {},
    project: {},
    isLoading: true,
    theme: {
      trader: '#f77123',
      user: '#8e3ccb'
    }
  };
  componentDidMount = async () => {
    const project = await getProject(2);

    const user = await getTrader('kitlts');
    // const user = await getUser('By-Tor2114');

    this.setState({ project, isLoading: false, user });
  };
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={this.state.theme}>
          <AppProvider value={this.state.user}>
            <Header />
            {this.state.isLoading ? (
              <h1>IS LOADING</h1>
            ) : (
              <Router className="router">
                {this.state.user ? (
                  <DashBoard path="/" />
                ) : (
                  <LandingPage path="/" />
                )}

                <LoginForm path="/login" />
                <SignUpForm path="/signup" />
                <TraderProfile path="/traders/:username" />
                <TraderMap path="/traders" project={this.state.project} />

                <NotFound default />
              </Router>
            )}
          </AppProvider>
        </ThemeProvider>
      </div>
    );
  }
}
