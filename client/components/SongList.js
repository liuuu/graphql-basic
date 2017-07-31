import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
  constructor(props) {
    console.log('in constuctor');
    super();
    this.renderSongs = this.renderSongs.bind(this);
  }

  handleDelete(id) {
    this.props.mutate({
      variables: {
        id: id
      },
      refetchQueries: [{ query: query, variables: {} }]
    });
    // .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          <Link to={`/songs/${song.id}`}>
            {song.title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.handleDelete(song.id)}
          >
            delete
          </i>
        </li>
      );
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.data.songs);
  }

  render() {
    console.log('来了', this.props.data.songs);
    if (this.props.data.songs) {
      return (
        <div>
          <ul className="collection">
            {this.renderSongs()}
          </ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    }
    return <div>loading</div>;
  }
}

export const query = gql`
  {
    songs {
      title
      id
    }
  }
`;

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
