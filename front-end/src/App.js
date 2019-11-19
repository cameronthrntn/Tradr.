import React, { Component } from 'react';
import { Router } from '@reach/router';
import './styles/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TraderMap from './components/TraderMap';
import { ThemeProvider } from 'styled-components';
import { getProject } from './utils/projects.js';
import { AppProvider } from './components/AppContext';

export default class App extends Component {
  state = {
    project: {},
    isLoading: true,
    theme: {
      orange: '#f77123'
    }
  };
  componentDidMount = async () => {
    const project = await getProject(1);
    this.setState({ project, isLoading: false });
  };
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={this.state.theme}>
          {/* <AppProvider value={this.state.project}> */}
          <Header />
          <Router>
            <LandingPage path="/" />
            {!this.state.isLoading && (
              <TraderMap path="/traders" project={this.state.project} />
            )}
          </Router>
          {/* </AppProvider> */}
        </ThemeProvider>
      </div>
    );
  }
}
