import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/SinglePost.css"

class SinglePost extends Component {

  render() {
    return (
      <div className="singlepost">
        <h1>{this.props.match.params.postId}</h1>
      </div>
    );
  };
};

export default SinglePost;