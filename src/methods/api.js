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