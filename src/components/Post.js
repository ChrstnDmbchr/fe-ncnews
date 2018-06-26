import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Post.css"

class Post extends Component {

  render() {
    const { title, created_by, belongs_to, body, comment_count, votes } = this.props;
    return (
      <div className="post section">
        <div className="post-votes">
          <i className="fa fa-angle-up fa-3x post-vote-up"></i>
          <i className="fa fa-angle-down fa-3x post-vote-down"></i>
          <p>votes: {votes}</p>
        </div>
        <div className="post-body">
          <h1 className="title">{title}</h1>
          <h5 className="subtitle">
            {body}
          </h5>
          <div className="post-info">
            <p>Created By: {created_by.username}</p>
            <p>Topic: {belongs_to.title}</p>
            <p>Comments: {comment_count}</p>
          </div>
        </div>
      </div>
    );
  };
};

export default Post;
