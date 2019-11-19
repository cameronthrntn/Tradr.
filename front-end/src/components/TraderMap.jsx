import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import TraderPin from './TraderPin';
import TraderList from './TraderList';
import styled from 'styled-components';
import { getDistances } from '../utils';
import { getTraders } from '../utils/traders';
import { AppConsumer } from './AppContext';
import FilterBar from './FilterBar';

export default class TraderMap extends Component {
  state = {
    traders: [],
    project: {},
    isLoading: true
  };
  updateTraders = async filters => {
    const traders = await getTraders(this.props.project.project_id, filters)
    this.setState({traders})
  }
  getTraders = async () => {
    let traders = await getTraders(this.props.project.project_id);
    traders = getDistances(
      { lat: this.props.project.lat, lng: this.props.project.lng },
      traders
    );
    return traders;
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (
      JSON.stringify(prevProps.project) !== JSON.stringify(this.props.project)
    ) {
      const traders = await this.getTraders();
      this.setState({
        traders,
        isLoading: false,
        project: this.props.project
      });
    }
  };
  componentDidMount = async () => {
    const traders = await this.getTraders();
    this.setState({
      traders,
      isLoading: false,
      project: this.props.project
    });
  };
  render() {
    const Container = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `;
    const MapWrapper = styled.div`
      height: 95vh;
      width: 80%;

    `;
    const TraderWrapper = styled.div`
      height: 95vh;
      margin: 0;
      width: 18%;
    `;
    return (
      <Container>
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <FilterBar updateTraders={this.updateTraders}/>
            <MapWrapper>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyCLjaFTw1ZCyLDZrMtk7uX6PkISOr0u-Vk'
                }}
                defaultCenter={{
                  lat: this.props.project.lat,
                  lng: this.props.project.lng
                }}
                defaultZoom={15}
              >
                <TraderPin
                  project={true}
                  lat={this.props.project.lat}
                  lng={this.props.project.lng}
                />
                {this.state.traders.map(trader => (
                  <TraderPin
                    project={false}
                    lat={trader.lat}
                    lng={trader.lng}
                    username={trader.username}
                    score={trader.score}
                    rate={trader.rate}
                    key={trader.username}
                  />
                ))}
              </GoogleMapReact>
            </MapWrapper>
            <TraderWrapper>
              <TraderList traders={this.state.traders} />
            </TraderWrapper>
          </>
        )}
      </Container>
    );
  }
}
