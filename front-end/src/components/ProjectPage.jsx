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
  render() {
    const ProjectHeader = styled.header`
      width: 100vw;
      height: 5vh;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      font-weight: bolder;
    `;
    const ProjectContent = styled.section`
      width: 90vw;
      display: flex;
      margin-left: 5vw;
    `;
    const ProjectInfo = styled.div`
      width: 70%;
    `;
    const Timeline = styled.div`
      width: 100%;
      display: flex;
      height: 5vh;
    `;
    const Time = styled.div`
      width: 45%;
      text-align: center;
      font-size: 2rem;
      font-weight: bolder;
      color: ${props => props.theme.trader};
    `;
    const EndTime = styled(Time)`
      color: ${props => props.theme.user};
    `;
    const ProjectDetails = styled.div`
      width: 100%;
      height: 65vh;
      display: flex;
    `;
    const TraderListWrapper = styled.div`
      overflow-x: hidden;
    `;
    const ProjectMap = styled.aside`
      width: 70%;
      height: 100%;
    `;
    const MapWrapper = styled.div`
      height: 100%;
      width: 100%;
      @media (max-width: 900px) {
        height: 60%;
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
    console.log(this.state.traders);
    
    return this.state.isLoading ? (
      <Loader />
    ) : JSON.parse(sessionStorage.user).username === project.username ||
      this.state.traders.filter(
        trader => trader.username === JSON.parse(sessionStorage.user).username
      ).length > 0 ? (
      <>
        <ProjectHeader>
          <LogoHead>{project.title.slice(0, 2)}</LogoHead>
          <LogoBody>{project.title.slice(2)}</LogoBody>
        </ProjectHeader>
        <TraderListWrapper>
          <ProjectTraderList
            project_id={this.props.project_id}
            traders={this.state.traders}
          />
        </TraderListWrapper>
        <ProjectContent>
          <ProjectInfo>
            <Timeline>
              <Time>
                {new Date(project.start_date).toLocaleString().split(',')[0]}
              </Time>
              <Arrow>></Arrow>
              <EndTime>
                {new Date(project.end_date).toLocaleString().split(',')[0]}
              </EndTime>
            </Timeline>
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
                      console.log(trader);
                      console.log(trader.lat);

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
      <h1>This is a private project</h1>
    );
  }
}
