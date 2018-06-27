import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <div className="userprofile-info">
            <p className="title is-1">{username}</p>
            <p className="subtitle is-3">
              <i>{user.name}</i>
            </p>
            <img className="userprofile-pic" src={user.avatar_url} alt="pic" />
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
