import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Nav from "./Nav.js"
import Articles from "./Articles.js"

class App extends Component {
  state = {
    topics: [],
    loading: true,
  }

  componentDidMount () {
    fetch('https://fast-hamlet-42674.herokuapp.com/api/topics')
    .then(res => {
      return res.json();
    })
    .then(allTopics => {
      const { topics } = allTopics
      this.setState({ topics, loading: false });
    });
  }

  render() {
    const { topics, loading } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Nav topics={topics} loading={loading}/>
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => {
                return <Redirect to="/Frontpage" />
              }} />
              <Route path="/:topicName" component={Articles} />
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
  }
}

export default App;
