import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import TraderPin from './TraderPin';
import TraderList from './TraderList';
import styled from 'styled-components';
import { getDistances } from '../utils';

export default class TraderMap extends Component {
  static defaultProps = {
    center: {
      lat: 53.795227,
      lng: -1.545038
    },
    zoom: 15
  };
  state = {
    traders: [
      {
        username: 'kitlets',
        first_name: 'Aaron',
        last_name: 'Stanton',
        lat: 53.9902,
        lng: -1.54508,
        avatar_ref: '/api/db/data/test/Images/18889192-plumber.jpg',
        rate: 230,
        dob: new Date('21/05/1984'),
        score: 3.7,
        personal_site: 'https://stackoverflow.com/',
        trade: 'plumber'
      },
      {
        username: 'Shubwub',
        first_name: 'Cameron',
        last_name: 'Thornton',
        lat: 53.80075,
        lng: -1.54907,
        avatar_ref:
          '/api/db/data/test/Images/happy-builder-thumbs-up-gesture-24867011.jpg',
        rate: 190,
        dob: new Date('10/08/1997'),
        score: 2.5,
        personal_site: 'https://github.com/',
        trade: 'builder'
      },
      {
        username: 'fakeTrader',
        first_name: 'Ima',
        last_name: 'Painter',
        lat: 53.01744,
        lng: -1.53882,
        avatar_ref:
          '/api/db/data/test/Images/14067112-portrait-of-a-friendly-painter.jpg',
        rate: 120,
        dob: new Date('01/04/1976'),
        score: 1.9,
        personal_site: 'https://northcoders.com/',
        trade: 'painter',
        scored: 'true'
      },
      {
        username: 'kitlets',
        first_name: 'Aaron',
        last_name: 'Stanton',
        lat: 53.990227,
        lng: -1.545038,
        avatar_ref: '/api/db/data/test/Images/18889192-plumber.jpg',
        rate: 230,
        dob: new Date('21/05/1984'),
        score: 0,
        personal_site: 'https://stackoverflow.com/',
        trade: 'plumber',
        scored: 'false'
      },
      {
        username: 'Shubwub',
        first_name: 'Cameron',
        last_name: 'Thornton',
        lat: 53.800755,
        lng: -1.549077,
        avatar_ref:
          '/api/db/data/test/Images/happy-builder-thumbs-up-gesture-24867011.jpg',
        rate: 190,
        dob: new Date('10/08/1997'),
        score: 3.8,
        personal_site: 'https://github.com/',
        trade: 'builder'
      },
      {
        username: 'fakeTrader',
        first_name: 'Ima',
        last_name: 'Painter',
        lat: 53.801744,
        lng: -1.538482,
        avatar_ref:
          '/api/db/data/test/Images/14067112-portrait-of-a-friendly-painter.jpg',
        rate: 120,
        dob: new Date('01/04/1976'),
        score: 1.9,
        personal_site: 'https://northcoders.com/',
        trade: 'painter'
      },
      {
        username: 'kitlets',
        first_name: 'Aaron',
        last_name: 'Stanton',
        lat: 53.990227,
        lng: -1.545038,
        avatar_ref: '/api/db/data/test/Images/18889192-plumber.jpg',
        rate: 230,
        dob: new Date('21/05/1984'),
        score: 3.7,
        personal_site: 'https://stackoverflow.com/',
        trade: 'plumber'
      },
      {
        username: 'Shubwub',
        first_name: 'Cameron',
        last_name: 'Thornton',
        lat: 53.800755,
        lng: -1.549077,
        avatar_ref:
          '/api/db/data/test/Images/happy-builder-thumbs-up-gesture-24867011.jpg',
        rate: 190,
        dob: new Date('10/08/1997'),
        score: 3.8,
        personal_site: 'https://github.com/',
        trade: 'builder'
      },
      {
        username: 'fakeTrader',
        first_name: 'Ima',
        last_name: 'Painter',
        lat: 53.801744,
        lng: -1.538482,
        avatar_ref:
          '/api/db/data/test/Images/14067112-portrait-of-a-friendly-painter.jpg',
        rate: 120,
        dob: new Date('01/04/1976'),
        score: 1.9,
        personal_site: 'https://northcoders.com/',
        trade: 'painter'
      },
      {
        username: 'kitlets',
        first_name: 'Aaron',
        last_name: 'Stanton',
        lat: 53.990227,
        lng: -1.545038,
        avatar_ref: '/api/db/data/test/Images/18889192-plumber.jpg',
        rate: 230,
        dob: new Date('21/05/1984'),
        score: 3.7,
        personal_site: 'https://stackoverflow.com/',
        trade: 'plumber'
      },
      {
        username: 'Shubwub',
        first_name: 'Cameron',
        last_name: 'Thornton',
        lat: 53.800755,
        lng: -1.549077,
        avatar_ref:
          '/api/db/data/test/Images/happy-builder-thumbs-up-gesture-24867011.jpg',
        rate: 190,
        dob: new Date('10/08/1997'),
        score: 3.8,
        personal_site: 'https://github.com/',
        trade: 'builder'
      },
      {
        username: 'fakeTrader',
        first_name: 'Ima',
        last_name: 'Painter',
        lat: 53.801744,
        lng: -1.538482,
        avatar_ref:
          '/api/db/data/test/Images/14067112-portrait-of-a-friendly-painter.jpg',
        rate: 120,
        dob: new Date('01/04/1976'),
        score: 1.9,
        personal_site: 'https://northcoders.com/',
        trade: 'painter'
      }
    ],
    isLoading: true
  };
  componentDidMount() {
    const traders = getDistances(this.props.center, this.state.traders);
    this.setState({ traders, isLoading: false });
  }
  render() {
    const Container = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    const MapWrapper = styled.div`
      height: 95vh;
      width: 65%;
      margin-top: 2.5vh;
    `;
    const TraderWrapper = styled.div`
      height: 95vh;
      width: 35%;
      margin-top: 2.5vh;
    `;
    return (
      <Container>
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <MapWrapper>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyCLjaFTw1ZCyLDZrMtk7uX6PkISOr0u-Vk'
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                <TraderPin
                  project={true}
                  lat={this.props.center.lat}
                  lng={this.props.center.lng}
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
              <TraderList traders={this.state.traders} />
            </TraderWrapper>
          </>
        )}
      </Container>
    );
  }
}
