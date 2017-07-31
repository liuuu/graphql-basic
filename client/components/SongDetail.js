import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props.data;
    if (song) {
      return (
        <div>
          <Link to="/" />
          <h3>
            {song.title}
          </h3>
          <LyricList lyrics={song.lyrics} />
          <LyricCreate songId={this.props.params.id} />
        </div>
      );
    }
    return <div>laoding</div>;
  }
}

const query = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(query, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);
