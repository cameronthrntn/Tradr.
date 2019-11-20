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
    showFilters: false,
    isLoading: true
  };
  updateTraders = async filters => {
    const traders = await getTraders(this.props.project.project_id, filters);
    this.setState({ traders });
  };
  toggleForm = () => {
    this.setState(curr => {
      return {
        showFilters: !curr.showFilters
      };
    });
  };
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
    const MapWrapper = styled.div`
      height: 90vh;
      width: 80%;
    `;
    const TraderWrapper = styled.div`
      height: 90vh;
      margin: 0;
      width: 18%;
      border: 1px solid green;
    `;
    const MapAndList = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 2vh;
    `;
    const Button = styled.button`
      background: white;
    `;
    return (
      <>
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {this.state.showFilters && (
              <FilterBar updateTraders={this.updateTraders} />
            )}
            <MapAndList>
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
                      trade={trader.trade}
                      avatar_ref={trader.avatar_ref}
                    />
                  ))}
                </GoogleMapReact>
              </MapWrapper>
              <TraderWrapper>
                <Button onClick={this.toggleForm}>Show Filters</Button>
                <TraderList traders={this.state.traders} />
              </TraderWrapper>
            </MapAndList>
          </>
        )}
      </>
    );
  }
}
