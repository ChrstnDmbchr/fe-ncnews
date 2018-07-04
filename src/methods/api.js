exports.getAllTopics = () => {
  return fetch('https://fast-hamlet-42674.herokuapp.com/api/topics')
  .then(res => {
    return res.json();
  })
};

exports.postNewArticle = (postData, topicId) => {
  return fetch(`https://fast-hamlet-42674.herokuapp.com/api/topics/${topicId}/articles`,{
    method: "POST",
    body: JSON.stringify({ title: postData.title, body: postData.body }),
    headers: { "Content-Type": "application/json" }
  })
}

exports.getUser = (username) => {
  return fetch(`https://fast-hamlet-42674.herokuapp.com/api/users/${username}`)
  .then(res => {
    return res.json();
  })
};

exports.getArticle = (articleId) => {
  return fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${articleId}`)
  .then(res => {
    return res.json();
  })
};

exports.getArticleComments = (articleId) => {
  return fetch(
    `https://fast-hamlet-42674.herokuapp.com/api/articles/${articleId}/comments`
  )
  .then(res => {
    return res.json();
  })
}

exports.deleteComment = (commentId) => {
  return fetch(`https://fast-hamlet-42674.herokuapp.com/api/comments/${commentId}`, {
    method: 'DELETE'
  })
  .then(res => {
    return res.json()
  })
}

exports.postArticleComment = (articleId, articleComment) => {
  return fetch(
    `https://fast-hamlet-42674.herokuapp.com/api/articles/${articleId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({ comment: articleComment }),
      headers: { "Content-Type": "application/json" }
    })
}

exports.getTopicArticles = (articleId) => {
  return fetch(
    articleId === 'Frontpage' ? `https://fast-hamlet-42674.herokuapp.com/api/articles`
    :`https://fast-hamlet-42674.herokuapp.com/api/topics/${articleId}/articles`
  )
  .then(res => {
    return res.json();
  })
}

exports.articleUpDownVote = (id, vote) => {
  return fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${id}?vote=${vote}`,{
    method: 'PUT'
  })
  .then(res => {
    return res.json();
  })
}

exports.commentUpDownVote = (id, vote) => {
  return fetch(
    `https://fast-hamlet-42674.herokuapp.com/api/comments/${id}?vote=${vote}`,{
      method: "PUT"
    })
    .then(res => {
      return res.json();
    })
}