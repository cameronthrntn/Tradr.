import React, { Component } from 'react';
import { Router } from '@reach/router';
import { setToken } from './utils/axios';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
// import LogInForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TraderMap from './components/TraderMap';
import { ThemeProvider } from 'styled-components';
import { getProject } from './utils/projects.js';
import { getTrader } from './utils/traders.js';
import { getUser } from './utils/users.js';
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
    },
    token: ''
  };
  signout = () => {
    this.setState({ user: {} });
    sessionStorage.clear();
  };
  initialiseAccount = (token, user) => {
    this.setState({ token, user });
    sessionStorage.setItem('user', JSON.stringify(user));
  };
  componentDidMount = async () => {
    if (sessionStorage.token) {
      const project = await getProject(2);
      this.setState({
        project,
        isLoading: false,
        user: JSON.parse(sessionStorage.user)
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  };
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={this.state.theme}>
          <AppProvider value={this.state.user}>
            <Header signout={this.signout} />
            {this.state.isLoading ? (
              <h1>IS LOADING</h1>
            ) : (
              <Router className="router">
                {this.state.user.username ? (
                  <DashBoard path="/" username={this.state.user.username} />
                ) : (
                  <LandingPage path="/" />
                )}

                <LoginForm
                  path="/login"
                  initialiseAccount={this.initialiseAccount}
                />
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
