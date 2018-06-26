import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Post.css"

class Post extends Component {

  render() {
    const { title, created_by, belongs_to, body, comment_count, votes } = this.props;
    return (
      <div class="post section">
        <div class="container">
          <h1 class="title">{title}</h1>
          <h5 class="subtitle">
            {body}
          </h5>
        </div>
      </div>
    );
  };
};

export default Post;
