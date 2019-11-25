import React, { Component } from 'react';
import styled from 'styled-components';

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
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    console.log(this.props.username);

    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
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
            placeholder="postCode"
            type="text"
            onChange={this.handleChange}
          />
          <label htmlFor="start_date">Start date:</label>
          <input id="start_date" type="date" onChange={this.handleChange} />
          <label htmlFor="end_date">End date:</label>
          <input id="end_date" type="date" onChange={this.handleChange} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewProjectForm;
