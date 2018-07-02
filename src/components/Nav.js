import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Nav.css"

class Nav extends Component {
  state= {
    topics: this.props.topics,
    isDropdownActive: false,
    loading: this.props.loading,
    isModalActive: false,
  };

  toggleDropdown = () => {
    this.setState({ isDropdownActive: !this.state.isDropdownActive })
  };

  toggleModal = () => {
    this.setState({ isModalActive: !this.state.isModalActive })
  };

  componentWillReceiveProps (newProps) {
    this.setState({ 
      topics: newProps.topics,
      loading: newProps.loading 
    });
  };

  render() {
    const { topics, isDropdownActive, loading, isModalActive } = this.state;

    return (
      <div>
      <nav className="nav">
        <div>
          <div className={`dropdown ${isDropdownActive ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button onClick={this.toggleDropdown} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Topics</span>
              <span className="icon is-small">
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </span>
              </button>
            </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <Link key={'frontpage'} to='/topics/Frontpage' className="dropdown-item" onClick={this.toggleDropdown}>
                Frontpage
              </Link>
              {loading ? '' : topics.map(topic => {
                return (
                  <Link key={topic._id} to={`/topics/${topic._id}`} className="dropdown-item" onClick={this.toggleDropdown}>
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
        <button className="button nav-post" onClick={this.toggleModal}>Post new Article</button>
      </div>
      </nav>

      <div class={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div class="modal-background" onClick={this.toggleModal}></div>
        <div class="modal-content">
          <div className="box">
            <p>modal box</p>
          </div>
        </div>
          <button class="modal-close is-large" aria-label="close" onClick={this.toggleModal}></button>
        </div>
      </div>
    );
  };
};

export default Nav;
