import React, { Component } from 'react';
import ProjectTraderList from './ProjectTraderList';
import { getProject } from '../utils/projects';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import TraderPin from './TraderPin';
import { getTradersOnProject } from '../utils/traders';

export default class ProjectPage extends Component {
  state = {
    project: {},
    traders: []
  };
  componentDidMount = async () => {
    const project = await getProject(this.props.project_id);
    const traders = await getTradersOnProject(this.props.project_id);
    this.setState({ project, traders });
  };
  render() {
    const ProjectHeader = styled.header`
      width: 100vw;
      height: 5vh;
      text-align: center;
    `;
    const ProjectContent = styled.section`
      width: 90vw;
      display: flex;
      margin-left: 5vw;
    `;
    const ProjectInfo = styled.div`
      width: 80%;
      border: 1px solid pink;
    `;
    const ChatWindow = styled.div`
      width: 20%;
      border: 1px solid blue;
    `;
    const Timeline = styled.div`
      width: 100%;
      display: flex;
      height: 5vh;
    `;
    const Time = styled.div`
      width: 50%;
    `;
    const ProjectDetails = styled.div`
      width: 100%;
      height: 65vh;
      border: 1px solid green;
      display: flex;
    `;
    const TraderListWrapper = styled.div`
      overflow-x: hidden;
    `;
    const ProjectImages = styled.section`
      width: 30%;
      border: 1px solid black;
      height: 100%;
      overflow-y: scroll;
    `;
    const ProjectMap = styled.aside`
      width: 70%;
      border: 1px solid purple;
      height: 100%;
    `;
    const ImageList = styled.ul`
      display: flex;
      flex-wrap: wrap;
      padding-left: 10px;
    `;
    const ProjectImage = styled.div`
      width: 150px;
      height: 150px;
      border: 1px solid blue;
      margin: 10px;
    `;
    const MapWrapper = styled.div`
      height: 100%;
      width: 100%;
      @media (max-width: 900px) {
        height: 60%;
        width: 100%;
      }
    `;
    const { project } = this.state;
    console.log(project);

    return JSON.parse(sessionStorage.user).username === project.username ? (
      <>
        <ProjectHeader>
          <h1>{project.title}</h1>
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
              <Time>
                {new Date(project.end_date).toLocaleString().split(',')[0]}
              </Time>
            </Timeline>
            <ProjectDetails>
              <ProjectImages>
                Images:
                <ImageList>
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                  <ProjectImage />
                </ImageList>
              </ProjectImages>
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
          <ChatWindow>chat</ChatWindow>
        </ProjectContent>
      </>
    ) : (
      <h1>This is a private project</h1>
    );
  }
}
