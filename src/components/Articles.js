import React, { Component } from 'react';

import "../styles/Articles.css"

import Post from "./Post"

class Articles extends Component {
  state= {
    loading: true,
    articles: [],
    title: '',
  };

  componentDidMount() {
    const { topicId } = this.props.match.params
    fetch(
      topicId === 'Frontpage' ? `https://fast-hamlet-42674.herokuapp.com/api/articles`
      :`https://fast-hamlet-42674.herokuapp.com/api/topics/${topicId}/articles`
    )
    .then(res => {
      return res.json();
    })
    .then(allArticles => {
      const { articles } = allArticles;
      this.setState({ articles, loading: false, title: topicId });
    })
    .catch(err => { console.log(err) })
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.topicId === this.props.match.params.topicId) return;

    const { topicId } = newProps.match.params
    fetch(
      topicId === 'Frontpage' ? `https://fast-hamlet-42674.herokuapp.com/api/articles`
      :`https://fast-hamlet-42674.herokuapp.com/api/topics/${topicId}/articles`
    )
    .then(res => {
      return res.json();
    })
    .then(allArticles => {
      const { articles } = allArticles;
      this.setState({ articles, loading: false, title: topicId });
    })
    .catch(err => { console.log(err) })
  };

  render() {
    const { articles, loading, title } = this.state
    return (
      <div className="articles">
        <div className="articles-banner">
          <h1 className="articles-title">{loading ? '' : title === 'Frontpage' ? 'Frontpage' : articles[0].belongs_to.title}</h1>
        </div>
        <div className="articles-posts">
          {articles.map(post => {
            return <Post 
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    created_by={post.created_by}
                    belongs_to={post.belongs_to} 
                    comment_count={post.comment_count}
                    votes={post.votes}
                    body={post.body}/>
            })}
        </div>
      </div>
    );
  };
};

export default Articles;
