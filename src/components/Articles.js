import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Articles.css"

class Articles extends Component {
  state= {
    loading: true,
    articles: [],
  };

  componentWillReceiveProps(newProps) {
    console.log(newProps)
    const { topicId } = newProps.match.params
    fetch(
      topicId === 'Frontpage' ? `https://fast-hamlet-42674.herokuapp.com/api/articles`
      :`https://fast-hamlet-42674.herokuapp.com/api/topics/${topicId}/articles`
    )
    .then(res => {
      return res.json();
    })
    .then(allArticles => {
      const { articles } = allArticles
      this.setState({ articles, loading: false })
    });
  };

  render() {
    return (
      <div className="articles">{this.props.match.params.topicId}</div>
    );
  }
}

export default Articles;
