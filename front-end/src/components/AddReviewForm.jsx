import React, { Component } from 'react';
import styled from 'styled-components';

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
    user_username: '',
    trader_username: '',
    heading: '',
    body: '',
    score: 4
  };

  handleChange = e => {
    // this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    // e.preventDefault();
    // const { lat, lng } = await getCoordinates(
    //   `${this.state.house},${this.state.town},${this.state.city},${this.state.postcode}`
    // );
    // const newProject = {
    //   title: this.state.title,
    //   username: this.props.username,
    //   lat,
    //   lng,
    //   start_date: this.state.start_date,
    //   end_date: this.state.end_date
    // };
    // postNewProject(newProject);
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
              id="heading"
              placeholder="Heading"
              type="text"
              onChange={this.handleChange}
            />
            <InputWrapper>
              <Input
                id="body"
                placeholder="Write your review here..."
                type="text"
                onChange={this.handleChange}
              />
            </InputWrapper>

            <label htmlFor="score">Score:</label>
            <select id="score" onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </Inputs>

          <LogInButton>Submit</LogInButton>
        </ProjectForm>
      </Container>
    );
  }
}

export default NewProjectForm;
