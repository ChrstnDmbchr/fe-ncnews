import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Comment from "./Comment.js"

import "../styles/SinglePost.css"

class SinglePost extends Component {
  state = {
    post: {},
    comments: [],
    articleComment: '',
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
    this.props.history.goBack();
  };

  setComment = e => {
    this.setState({
      articleComment: e.target.value
    });
  };

  postArticleComment = () => {
    const { postId } = this.props.match.params;
    const { articleComment } = this.state;

    if (!articleComment.length) return;

    fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${postId}/comments`,{
      method: 'POST',
      body: JSON.stringify({comment: articleComment}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      return res.json();
    })
    .then(comment => {
      this.setState({
        articleComment: '',
        comments : this.state.comments.concat([comment.comment]),
      });
    });
  };

  render() {
    const { post, comments, articleComment } = this.state
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
          <p>Created By: <Link to={`/users/${post.created_by}`}>{post.created_by}</Link></p>
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea is-medium" type="text" placeholder={`Post a comment to article - ${post.title}`} onChange={this.setComment} value={articleComment}></textarea>
          </div>
        </div>
        <div className="singlepost-postbutton">
          <a className="button is-light is-medium" onClick={this.postArticleComment}>Post</a>
        </div>
        <div className="singlepost-comments">
          <p className="subtitle is-3">comments:</p>
          {comments.map(comment => {
            return <Comment key={comment._id} id={comment._id} body={comment.body} votes={comment.votes} created_by={comment.created_by} />
          })}
        </div>
      </div>
    );
  };
};

export default SinglePost;