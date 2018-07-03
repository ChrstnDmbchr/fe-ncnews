import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Post.css"

class Post extends Component {
  state = {
    id: this.props.id,
    votes: this.props.votes,
  }

  postUpVote = () => {
    fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${this.state.id}?vote=up`,{
      method: 'PUT'
    })
    .then(res => {
      return res.json();
    })
    .then(upvote => {
      this.setState({
        votes: upvote.vote_count
      })
    })
    .catch(err => console.log(err))
  }

  postDownVote = () => {
    fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${this.state.id}?vote=down`,{
      method: 'PUT'
    })
    .then(res => {
      return res.json();
    })
    .then(downvote => {
      this.setState({
        votes: downvote.vote_count
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    const { title, created_by, belongs_to, body, comment_count } = this.props;
    const { votes, id } = this.state;

    return (
      <div className="post section animated slideInUp">
        <div className="post-votes">
          <i className="fa fa-angle-up fa-3x post-vote-up" onClick={this.postUpVote}></i>
          <i className="fa fa-angle-down fa-3x post-vote-down" onClick={this.postDownVote}></i>
          <p>votes: {votes}</p>
        </div>
        <div className="post-body">
          <Link to={`/post/${id}`}><h1 className="title">{title}</h1></Link>
          <h5 className="subtitle">
            {body}
          </h5>
          <div className="post-info">
            {created_by.username ? <p>Created By: <Link to={`/users/${created_by.username}`}>{created_by.username}</Link></p> : <p />}
            {belongs_to.title ? <p>Topic: {belongs_to.title}</p> : <p />}
            {comment_count ? <p>Comments: <Link to={`/post/${this.props.id}`}>{comment_count}</Link></p> : <p />}
          </div>
        </div>
      </div>
    );
  };
};

export default Post;
