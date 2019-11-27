import React, { Component } from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import TraderMap from './components/TraderMap';
import { ThemeProvider } from 'styled-components';
import NotFound from './components/404NotFound';
import { AppProvider } from './components/AppContext';
import DashBoard from './components/DashBoard';
import TraderProfile from './components/TraderProfile';
import Loader from './components/Loader';
import ProjectPage from './components/ProjectPage';

export default class App extends Component {
  state = {
    user: {},
    isLoading: true,
    theme: {
      trader: '#38C4BD',
      trader_light: '#b1f0ec',
      trader_dark: '#23918c',
      user: '#A068CC',
      user_light: '#874eb5',
      user_dark: '#713f99',
      grey: '#ececec',
      greytext: '#898989',
      deeperLayer: '#dcdcdc',
      red: '#e8463a'
    },
    token: ''
  };
  signout = async () => {
    await this.setState({ user: {} });
    sessionStorage.clear();
  };
  initialiseAccount = async (token, user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.setState({ token, user });
  };
  componentDidMount = async () => {
    if (sessionStorage.user) {
      this.setState({
        isLoading: false,
        user: JSON.parse(sessionStorage.user)
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  };
  updateUserInfo = body => {
    this.setState(currentState => {
      return { user: { ...currentState.user, ...body } };
    });
  };
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={this.state.theme}>
          <AppProvider value={this.state.user}>
            <Header
              signout={this.signout}
              isLoggedIn={this.state.user.username}
            />
            {this.state.isLoading ? (
              <Loader theme={this.state.theme} />
            ) : (
              <Router className="router">
                {this.state.user.username ? (
                  <DashBoard
                    updateUserInfo={this.updateUserInfo}
                    path="/"
                    username={this.state.user.username}
                  />
                ) : (
                  <LandingPage
                    path="/"
                    initialiseAccount={this.initialiseAccount}
                  />
                )}
                <ProjectPage path="/project/:project_id" />
                <SignUpForm path="/signup" />
                <TraderProfile path="/traders/:username" />
                <TraderMap path="/map/:project_id" />
                <NotFound default />
              </Router>
            )}
          </AppProvider>
        </ThemeProvider>
      </div>
    );
  }
}
