import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/Comment.css";
import api from "../methods/api"

class Comment extends Component {
  state = {
    votes: this.props.votes,
    id: this.props.id
  };

  postUpVote = () => {
    api.commentUpDownVote(this.state.id, 'up')
    .then(upvote => {
      this.setState({
        votes: upvote.vote_count
      });
    })
    .catch(err => console.log(err));
  };

  postDownVote = () => {
    api.commentUpDownVote(this.state.id, 'down')
    .then(downvote => {
      this.setState({
        votes: downvote.vote_count
      });
    })
    .catch(err => console.log(err));
  };

  render() {
    const { created_by, body, deleteSingleComment } = this.props;
    const { votes, id } = this.state;
    return (
      <div className="comment section animated slideInUp">
        <div className="comment-votes">
          <i
            className="fa fa-angle-up fa-3x comment-vote-up"
            onClick={this.postUpVote}
          />
          <i
            className="fa fa-angle-down fa-3x comment-vote-down"
            onClick={this.postDownVote}
          />
          <p>votes: {votes}</p>
        </div>
        <div className="comment-body">
          <div className="comment-body-delete">
            {created_by === 'hackaccount' ? <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={() => deleteSingleComment(id)}
            /> : <div />}
          </div>
          <h5 className="subtitle">{body}</h5>
          <div className="comment-info">
            <p>
              Posted By: <Link to={`/users/${created_by}`}>{created_by}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
