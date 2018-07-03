import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../styles/Nav.css"

import api from "../methods/api"

class Nav extends Component {
  state= {
    topics: this.props.topics,
    isDropdownActive: false,
    loading: this.props.loading,
    isModalActive: false,
    newArticleTitle: '',
    newArticleBody: '',
    postArticleLoading: false,
    postStatus: '',
  };

  toggleDropdown = () => {
    this.setState({ isDropdownActive: !this.state.isDropdownActive })
  };

  toggleModal = () => {
    this.setState({ 
      isModalActive: !this.state.isModalActive,
      postStatus: '',
      newArticleBody: '',
      newArticleTitle: '',
    });
  };

  changeArticleTitle = e => {
    this.setState({ newArticleTitle: e.target.value })
  };

  changeArticleBody = e => {
    this.setState({ newArticleBody: e.target.value })
  };

  postNewArticle = (e, postData, topicTitle) => {
    e.preventDefault();
    if(!postData.title.length || !postData.body.length) return;
    
    this.setState({ 
      postArticleLoading: !this.state.postArticleLoading,
      postStatus: ''
    });

    const topicId = this.state.topics.filter(topic => {
      return topic.title === topicTitle
    })[0]._id

    api.postNewArticle(postData, topicId)
    .then(res => {
      if (res.status !== 201) {
        this.setState({
          postStatus: "error"
        });
      } 
      return res.json()
    })
    .then(newArticle => {
      this.setState({ 
        postArticleLoading: !this.state.postArticleLoading,
        postStatus: "success" 
      })
    })
    .catch(err => console.log(err))
  }

  componentWillReceiveProps (newProps) {
    this.setState({ 
      topics: newProps.topics,
      loading: newProps.loading 
    });
  };

  render() {
    const { topics, isDropdownActive, loading, isModalActive, postArticleLoading, newArticleTitle, newArticleBody, postStatus } = this.state;

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

      <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={this.toggleModal}></div>
        <div className="modal-content">
          <div className="box">
            <form>
              <div className="field">
                <label className="label">Select a topic to post your article to:</label>
                <div className="control">
                  <div className="select">
                    <select ref={'topicSelect'}>
                      {topics.map(topic => {
                        return <option key={topic._id}>{topic.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Enter the title of your article" onChange={this.changeArticleTitle}/>
                </div>
              </div>

              <div className="field">
                <label className="label">Article Content:</label>
                <div className="control">
                  <textarea className="textarea" onChange={this.changeArticleBody}></textarea>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className={`button is-link ${postArticleLoading ? 'is-loading' : ''}`} onClick={(e) => this.postNewArticle(e, {
                    title: newArticleTitle,
                    body: newArticleBody
                  }, this.refs.topicSelect.value)}
                  disabled={postStatus.length}>Post Article</button>
                </div>
                <div className="control">
                  <button className="button is-text" onClick={this.toggleModal}>Close</button>
                </div>
              </div>

              {!postStatus.length ? (
                <div />
              ) : postStatus === "success" ? (
                <div className="singlepost-notification notification is-primary">
                  <strong>Post Successful! <br/> Click Close to return</strong>
                </div>
              ) : (
                <div className="singlepost-notification notification is-danger">
                  <strong>Error - there was an issue when trying to process your post.</strong>
                </div>
              )}

            </form>
          </div>
        </div>
          <button className="modal-close is-large" aria-label="close" onClick={this.toggleModal}></button>
        </div>
      </div>
    );
  };
};

export default Nav;
