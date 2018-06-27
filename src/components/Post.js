import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Post.css"

class Post extends Component {

  render() {
    const { title, created_by, belongs_to, body, comment_count, votes } = this.props;
    return (
      <div className="post section animated slideInUp">
        <div className="post-votes">
          <i className="fa fa-angle-up fa-3x post-vote-up"></i>
          <i className="fa fa-angle-down fa-3x post-vote-down"></i>
          <p>votes: {votes}</p>
        </div>
        <div className="post-body">
          <Link to={`/post/${this.props.id}`}><h1 className="title">{title}</h1></Link>
          <h5 className="subtitle">
            {body}
          </h5>
          <div className="post-info">
            {created_by.username ? <p>Created By: <Link to={`/users/${created_by.username}`}>{created_by.username}</Link></p> : <p />}
            {belongs_to.title ? <p>Topic: {belongs_to.title}</p> : <p />}
            {comment_count ? <p>Comments: {comment_count}</p> : <p />}
          </div>
        </div>
      </div>
    );
  };
};

export default Post;
