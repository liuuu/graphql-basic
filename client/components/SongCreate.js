import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Link, hashHistory } from 'react-router';

import { query } from './SongList';
class SongCreate extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.value
        }
        // refetchQueries: [{ query: query, variables: {} }]
      })
      .then(() => {
        hashHistory.push('/');
      });
    this.setState({
      value: ''
    });
  }
  render() {
    return (
      <div>
        <Link to="/">back</Link>
        <div>Create new song</div>
        <form action="" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
