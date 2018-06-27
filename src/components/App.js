import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Nav from "./Nav.js"
import Articles from "./Articles.js"
import UserProfile from './UserProfile.js';

class App extends Component {
  state = {
    topics: [],
    loading: true,
  };

  componentDidMount () {
    fetch('https://fast-hamlet-42674.herokuapp.com/api/topics')
    .then(res => {
      return res.json();
    })
    .then(allTopics => {
      const { topics } = allTopics
      this.setState({ topics, loading: false });
    });
  };

  render() {
    const { topics, loading } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Nav topics={topics} loading={loading}/>
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => {
                return <Redirect to="/topics/Frontpage" />
              }} />
              <Route path="/topics/:topicId" component={Articles} />
              <Route path="/users/:username" component={UserProfile} />
              <Route render={() => {
                return (
                  <h4>404 - ya dun goof'd</h4>
                )
              }} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;
