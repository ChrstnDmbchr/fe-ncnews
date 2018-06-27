import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Comment.css"

class Comment extends Component {

  render() {
    const { created_by, body, votes } = this.props;
    return (
      <div className="comment section animated slideInUp">
        <div className="comment-votes">
          <i className="fa fa-angle-up fa-3x comment-vote-up"></i>
          <i className="fa fa-angle-down fa-3x comment-vote-down"></i>
          <p>votes: {votes}</p>
        </div>
        <div className="comment-body">
          <h5 className="subtitle">
            {body}
          </h5>
          <div className="comment-info">
            <p>Posted By: <Link to={`/users/${created_by}`}>{created_by}</Link></p>
          </div>
        </div>
      </div>
    );
  };
};

export default Comment;