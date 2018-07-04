import React, { Component } from "react";
import { Link } from "react-router-dom";

import Comment from "./Comment.js";

import "../styles/SingleArticle.css";

import api from "../methods/api"

class SinglePost extends Component {
  state = {
    post: {},
    comments: [],
    articleComment: "",
    postStatus: "",
    postCommentLoading: false,
  };

  componentDidMount() {
    const { articleId } = this.props.match.params;

    api.getArticle(articleId)
    .then(post => {
      this.setState({ post });
    })
    .catch(err => console.log(err));

    api.getArticleComments(articleId)
    .then(allComments => {
      const { comments } = allComments;
      if (!comments) {
        return this.setState({ comments: [] })
      }
      this.setState({ comments });
    })
    .catch(err => console.log(err));
  }

  goBack = () => {
    this.props.history.goBack();
  };

  setComment = e => {
    this.setState({
      articleComment: e.target.value
    });
  };

  clearMessage = () => {
    this.setState({
      postStatus: ""
    });
  };

  deleteSingleComment = (commentId) => {
    api.deleteComment(commentId)
    .then(commentDel => {
      this.setState({
        comments: [...this.state.comments].filter(com => {
          return com._id !== commentId
        })
      });
    })
    .catch(err => console.log(err))
  };

  postArticleComment = () => {
    const { articleId } = this.props.match.params;
    const { articleComment } = this.state;

    if (!articleComment.length) return;

    this.setState({ postCommentLoading: true }, () => {
      api.postArticleComment(articleId, articleComment)
      .then(res => {
        if (res.status !== 201) {
          this.setState({
            postStatus: "error",
            postCommentLoading: false
          });
        } 
        return res.json();
      })
      .then(comment => {
        this.setState({
          articleComment: "",
          comments: this.state.comments.concat([comment.comment]),
          postStatus: "success",
          postCommentLoading: false
        });
      })
      .catch(err => console.log(err));
    })
  };

  render() {
    const { post, comments, articleComment, postStatus, postCommentLoading } = this.state;
    return (
      <div className="singlepost">
        <div className="singlepost-banner">
          <h1 className="singlepost-title">Article</h1>
        </div>
        <div className="singlepost-info">
          <div className="singlepost-info-back">
            <a className="button" onClick={this.goBack}>
              Go Back
            </a>
          </div>
          <p className="title is-1">{post.title}</p>
          <p className="subtitle is-3">
            <i>{post.body}</i>
          </p>
          <p>
            Created By:{" "}
            <Link to={`/users/${post.created_by}`}>{post.created_by}</Link>
          </p>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea is-medium"
              type="text"
              placeholder={`Post a comment to article - ${post.title}`}
              onChange={this.setComment}
              value={articleComment}
            />
          </div>
        </div>
        <div className="singlepost-postbutton">
          <a
            className={`button is-light is-medium ${postCommentLoading ? 'is-loading' : ''}`}
            onClick={this.postArticleComment} disabled={!articleComment.length}
          >
            Post Comment
          </a>
        </div>
        {!postStatus.length ? (
          <div />
        ) : postStatus === "success" ? (
          <div className="singlepost-notification notification is-primary">
            <button className="delete" onClick={this.clearMessage} />
            <strong>Post Successful!</strong>
          </div>
        ) : (
          <div className="singlepost-notification notification is-danger">
            <button className="delete" onClick={this.clearMessage} />
            <strong>Error - there was an issue when trying to process your post.</strong>
          </div>
        )}
        <div className="singlepost-comments">
          <p className="subtitle is-3">comments:</p>
          {!comments.length ? <p>No Comments</p> : comments.map(comment => {
            return (
              <Comment
                key={comment._id}
                id={comment._id}
                body={comment.body}
                votes={comment.votes}
                created_by={comment.created_by}
                deleteSingleComment={this.deleteSingleComment}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SinglePost;
