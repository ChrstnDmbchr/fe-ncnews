import React, { Component } from "react";

import Post from "./Post"

import "../styles/UserProfile.css";

import api from "../methods/api"

class UserProfile extends Component {
  state = {
    loading: true,
    username: this.props.match.params.username,
    user: {},
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    api.getUser(username)
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
          <h1 className="userprofile-title">Users</h1>
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
              <p className="subtitle is-3">Posts by: {username}</p>
            </div>
            <div>
              {!user.articles.length ? <div className="userprofile-noposts"><h1>No Posts</h1></div> :
              user.articles.map(post => {
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
