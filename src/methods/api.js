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

exports.getArticle = (postId) => {
  return fetch(`https://fast-hamlet-42674.herokuapp.com/api/articles/${postId}`)
  .then(res => {
    return res.json();
  })
};

exports.getArticleComments = (postId) => {
  return fetch(
    `https://fast-hamlet-42674.herokuapp.com/api/articles/${postId}/comments`
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

exports.postArticleComment = (postId, articleComment) => {
  return fetch(
    `https://fast-hamlet-42674.herokuapp.com/api/articles/${postId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({ comment: articleComment }),
      headers: { "Content-Type": "application/json" }
    })
}