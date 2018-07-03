exports.getAllTopics = () => {
  return fetch('https://fast-hamlet-42674.herokuapp.com/api/topics')
  .then(res => {
    return res.json();
  })
}