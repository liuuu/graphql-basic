import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
      })
      .then();
    this.setState({ content: '' });
  }
  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="">add lyricc</label>
          <input
            value={this.state.content}
            onChange={e => {
              this.setState({ content: e.target.value });
            }}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddLyric($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
