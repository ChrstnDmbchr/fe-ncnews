import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Articles.css"

class Articles extends Component {
  state= {
    loading: true,
    articles: [],
  }
  render() {
    return (
      <div className="articles">{this.props.match.params.topicName}</div>
    );
  }
}

export default Articles;
