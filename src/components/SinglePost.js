import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/SinglePost.css"

class SinglePost extends Component {
  state = {
    post: {},
    comments: [],
  };

  componentDidMount () {
    const { postId } = this.props.match.params;
    fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${postId}`)
    .then(res => {
      return res.json();
    })
    .then(post => {
      this.setState({ post })
    })
    .catch(err => console.log(err))

    fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${postId}/comments`)
    .then(res => {
      return res.json();
    })
    .then(allComments => {
      const { comments } = allComments
      this.setState({ comments })
    })
    .catch(err => console.log(err))
  }

  goBack = () => {
    this.props.history.goBack()
  };

  render() {
    const { post } = this.state
    return (
      <div className="singlepost">
        <div className="singlepost-banner">
          <h1 className="singlepost-title">Post</h1>
        </div>
        <div className="singlepost-info">
          <div className="singlepost-info-back">
            <a className="button" onClick={this.goBack}>Go Back</a>
            </div>
              <p className="title is-1">{post.title}</p>
              <p className="subtitle is-3">
                <i>{post.body}</i>
              </p>
            </div>
      </div>
    );
  };
};

export default SinglePost;