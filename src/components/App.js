import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Nav from "./Nav.js";
import Articles from "./Articles.js";
import UserProfile from "./UserProfile.js";
import SinglePost from "./SinglePost.js";
import PageNotFound from "./PageNotFound";

import api from "../methods/api"

class App extends Component {
  state = {
    topics: [],
    loading: true,
  };

  componentDidMount () {
    api.getAllTopics()
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
              <Route exact path="/post/:postId" component={SinglePost} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;
