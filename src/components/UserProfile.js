import React, { Component } from "react";
import { Link } from "react-router-dom";

import Post from "./Post"

import "../styles/UserProfile.css";

class UserProfile extends Component {
  state = {
    loading: true,
    username: this.props.match.params.username,
    user: {},
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    fetch(`https://fast-hamlet-42674.herokuapp.com/api/users/${username}`)
      .then(res => {
        return res.json();
      })
      .then(user => {
        this.setState({ user, loading: false });
      })
      .catch(err => console.log(err));
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { loading, username, user } = this.state;
    return (
      <div className="userprofile">
        <div className="userprofile-banner">
          <div className="userprofile-user">
            <h1 className="userprofile-title">Users</h1>
          </div>
        </div>
        {loading ? (
          <div />
        ) : (
          <div>
            <div className="userprofile-info">
              <div className="userprofile-info-back">
                <a className="button" onClick={this.goBack}>Go Back</a>
              </div>
              <p className="title is-1">{username}</p>
              <p className="subtitle is-3">
                <i>{user.name}</i>
              </p>
              <img className="userprofile-pic" src={user.avatar_url} alt="pic" />
              <p className="subtitle is-3">Post by {username}:</p>
            </div>
            <div>
              {user.articles.map(post => {
              return <Post 
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      created_by={post.created_by}
                      belongs_to={post.belongs_to} 
                      comment_count={post.comment_count}
                      votes={post.votes}
                      body={post.body}/>
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
