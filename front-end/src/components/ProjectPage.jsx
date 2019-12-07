import React, { Component } from 'react';
import ProjectTraderList from './ProjectTraderList';
import { getProject } from '../utils/projects';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import TraderPin from './TraderPin';
import { getTradersOnProject } from '../utils/traders';
import Loader from './Loader';
import ChatWindow from './ChatWindow';
import { LogoHead, LogoBody } from '../styles/Header';
import ProjectImages from './ProjectImages';
import { updateProject } from '../utils/projects';
import NotFound from './404NotFound';

export default class ProjectPage extends Component {
  state = {
    project: {},
    traders: [],
    messages: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const project = await getProject(this.props.project_id);
    const traders = await getTradersOnProject(this.props.project_id);
    sessionStorage.setItem('project_id', project.project_id);
    this.setState({ project, traders, isLoading: false });
  };

  handleChange = async e => {
    const project = await updateProject(this.state.project.project_id, e);
    this.setState({ project });
  };

  render() {
    const ProjectHeader = styled.header`
      width: 100vw;
      height: 50px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      align-items: center;
      font-size: 2rem;
      font-weight: bolder;
      @media (max-width: 900px) {
        font-size: 15px;
      }
    `;
    const ProjectContent = styled.section`
      display: flex;
      margin: 20px;
      @media (max-width: 900px) {
        flex-direction: column;
        margin: 0;
        align-items: center;
      }
    `;
    const ProjectInfo = styled.div`
      width: 70%;
      @media (max-width: 900px) {
        width: 100vw;
      }
    `;
    const Timeline = styled.div`
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 5vh;
    `;
    const Time = styled.div`
      text-align: center;
      margin-right: 40px;
    `;

    const ProjectDetails = styled.div`
      width: 100%;
      height: 65vh;
      display: flex;
      @media (max-width: 900px) {
        width: 100%;
        flex-direction: column;
      }
    `;
    const TraderListWrapper = styled.div`
      overflow-x: hidden;
    `;
    const ProjectMap = styled.aside`
      width: 70%;
      height: 100%;
      @media (max-width: 900px) {
        width: 100%;
        height: 100%;
        order: -1;
      }
    `;
    const MapWrapper = styled.div`
      height: 100%;
      width: 100%;
      @media (max-width: 900px) {
        width: 100%;
      }
    `;
    const Arrow = styled.p`
      width: 10%;
      margin: 0;
      font-size: 2rem;
      font-weight: bolder;
    `;

    const { project } = this.state;
    return this.state.isLoading ? (
      <Loader />
    ) : JSON.parse(sessionStorage.user).username === project.username ||
      this.state.traders.filter(
        trader => trader.username === JSON.parse(sessionStorage.user).username
      ).length > 0 ? (
      <>
        <ProjectHeader>
          <div>{project.title}</div>

          <Time>
            {new Date(project.start_date).toLocaleString().split(',')[0]} -{' '}
            {new Date(project.end_date).toLocaleString().split(',')[0]}
          </Time>
        </ProjectHeader>
        <TraderListWrapper>
          <ProjectTraderList
            project_id={this.props.project_id}
            traders={this.state.traders}
            status={this.state.project.status}
            handleChange={this.handleChange}
          />
        </TraderListWrapper>
        <ProjectContent>
          <ProjectInfo>
            <ProjectDetails>
              <ProjectImages project_id={project.project_id} />
              <ProjectMap>
                <MapWrapper>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: 'AIzaSyCLjaFTw1ZCyLDZrMtk7uX6PkISOr0u-Vk'
                    }}
                    defaultCenter={{
                      lat: this.state.project.lat,
                      lng: this.state.project.lng
                    }}
                    defaultZoom={15}
                  >
                    <TraderPin
                      project={true}
                      lat={this.state.project.lat}
                      lng={this.state.project.lng}
                    />
                    {this.state.traders.map((trader, idx) => {
                      return (
                        <TraderPin
                          project={false}
                          lat={trader.lat}
                          lng={trader.lng}
                          username={trader.trader_username}
                          score={trader.score}
                          rate={trader.rate}
                          projectPage={true}
                          key={`${trader.username}-${idx}`}
                          trade={trader.trade}
                          avatar_ref={trader.avatar_ref}
                        />
                      );
                    })}
                  </GoogleMapReact>
                </MapWrapper>
              </ProjectMap>
            </ProjectDetails>
          </ProjectInfo>
          <ChatWindow project_id={this.state.project.project_id} />
        </ProjectContent>
      </>
    ) : (
      <NotFound
        message={`Sorry, you don't have access to this project`}
        code={403}
      />
    );
  }
}
