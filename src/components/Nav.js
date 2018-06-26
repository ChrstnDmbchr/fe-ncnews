import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import "../styles/Nav.css"

class Nav extends Component {
  state= {
    topics: {},
    isDropdownActive: false,
    loading: true,
  }

  toggleDropdown = () => {
    this.setState({ isDropdownActive: !this.state.isDropdownActive })
  }

  componentDidMount () {
    fetch('https://fast-hamlet-42674.herokuapp.com/api/topics')
    .then(res => {
      return res.json();
    })
    .then(allTopics => {
      const { topics } = allTopics
      this.setState({ topics, loading: false });
    });
  };

  render() {
    const { topics, isDropdownActive, loading } = this.state;

    return (
      <nav className="nav">
        <div>
          <div className={`dropdown ${isDropdownActive ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button onClick={this.toggleDropdown} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Topics</span>
              <span className="icon is-small">
                <i class="fa fa-sort-desc" aria-hidden="true"></i>
              </span>
              </button>
            </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <Link key={'frontpage'} to='/' className="dropdown-item" onClick={this.toggleDropdown}>
                Frontpage
              </Link>
              {loading ? '' : topics.map(topic => {
                return (
                  <Link key={topic._id} to={`/${topic.title}`} className="dropdown-item" onClick={this.toggleDropdown}>
                    {topic.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="nav-title">
        <h1>NC NEWS<span className="flash">_</span></h1>
      </div>
      <div>
        Maybe add search here later
      </div>
      </nav>
    );
  };
};

export default Nav;
