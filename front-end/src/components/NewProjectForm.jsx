import React, { Component } from 'react';
import styled from 'styled-components';
import { postNewProject } from '../utils/projects';
import { getCoordinates } from '../utils/makeAccount';
import {
  Inputs,
  Input,
  InputWrapper,
  HalfInput,
  Form,
  LogInButton
} from '../styles/Forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

const ProjectForm = styled(Form)`
  width: 30%;
  color: white;
  background-color: ${props => props.theme.user};
  padding: 20px;
  position: relative;
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
  font-size: 15px;
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

    const project = await postNewProject(newProject);
    this.props.updateInPlanning(project);
    this.props.handleBool();
  };

  render() {
    return (
      <Container>
        <ProjectForm action="" onSubmit={this.handleSubmit}>
          <h3>New project</h3>
          <XButton onClick={this.props.handleBool}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </XButton>
          <Inputs>
            <Input
              id="title"
              placeholder="Title"
              type="text"
              onChange={this.handleChange}
            />
            <InputWrapper>
              <HalfInput
                id="house"
                placeholder="House number"
                type="text"
                onChange={this.handleChange}
              />
              <HalfInput
                id="town"
                placeholder="Town"
                type="text"
                onChange={this.handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <HalfInput
                required
                id="city"
                placeholder="City"
                type="text"
                onChange={this.handleChange}
              />
              <HalfInput
                id="postCode"
                placeholder="Post code"
                type="text"
                onChange={this.handleChange}
              />
            </InputWrapper>

            <label htmlFor="country">Country:</label>
            <select
              id="country"
              placeholder="Country"
              onChange={this.handleChange}
            >
              <option value="United Kingdom">United Kingdom</option>
              <option value="France">France</option>
            </select>

            <label htmlFor="start_date">Start date:</label>
            <Input id="start_date" type="date" onChange={this.handleChange} />
            <label htmlFor="end_date">End date:</label>
            <Input id="end_date" type="date" onChange={this.handleChange} />
          </Inputs>

          <LogInButton>Submit</LogInButton>
        </ProjectForm>
      </Container>
    );
  }
}

export default NewProjectForm;
