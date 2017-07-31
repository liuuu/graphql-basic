import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider, createNetworkInterface } from 'react-apollo';

import { Router, hashHistory, IndexRoute, Route } from 'react-router';

import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
// console.log(ApolloProvider);
console.log('wmdf;', ApolloProvider);

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});
// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: 'http://localhost:4000/graphql'
//   })
// });

const Root = () =>
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="/songs/new" component={SongCreate} />
        <Route path="/songs/:id" component={SongDetail} />
      </Route>
    </Router>
  </ApolloProvider>;

ReactDOM.render(<Root />, document.querySelector('#root'));
