import React, { Component } from 'react';
import styled from 'styled-components';
import { postNewProject } from '../utils/projects';
import { getCoordinates } from '../utils/makeAccount';

const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${props => props.theme.user};
  align-self: center;
  margin: 3em 20px 20px 20px;
  border-radius: 10px;
  min-width: 25%;
  margin: auto;
  text-align: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const XButton = styled.button`
  position: absolute;
  border-radius: 50%;
  top: -10px;
  color: ${props => props.theme.greytext};
  right: -10px;
  height: 30px;
  width: 30px;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  border: none;
  background: ${props => props.theme.grey};
  cursor: pointer;
`;

class NewProjectForm extends Component {
  state = {
    title: '',
    country: 'United Kingdom',
    start_date: '',
    end_date: '',
    house: '',
    town: '',
    city: '',
    postCode: ''
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { lat, lng } = await getCoordinates(
      `${this.state.house},${this.state.town},${this.state.city},${this.state.postcode}`
    );
    const newProject = {
      title: this.state.title,
      username: this.props.username,
      lat,
      lng,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    postNewProject(newProject);
  };

  render() {
    console.log(this.props.username);

    return (
      <Container>
        <Form action="" onSubmit={this.handleSubmit}>
          <XButton onClick={this.props.handleBool}>X</XButton>
          <input
            id="title"
            placeholder="Title"
            type="text"
            onChange={this.handleChange}
          />
          <input
            id="house"
            placeholder="House number"
            type="text"
            onChange={this.handleChange}
          />
          <input
            id="town"
            placeholder="Town"
            type="text"
            onChange={this.handleChange}
          />
          <input
            required
            id="city"
            placeholder="City"
            type="text"
            onChange={this.handleChange}
          />
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            placeholder="Country"
            onChange={this.handleChange}
          >
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
          </select>

          <input
            id="postCode"
            placeholder="Post code"
            type="text"
            onChange={this.handleChange}
          />
          <label htmlFor="start_date">Start date:</label>
          <input id="start_date" type="date" onChange={this.handleChange} />
          <label htmlFor="end_date">End date:</label>
          <input id="end_date" type="date" onChange={this.handleChange} />
          <button>Submit</button>
        </Form>
      </Container>
    );
  }
}

export default NewProjectForm;
